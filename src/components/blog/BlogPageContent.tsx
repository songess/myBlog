'use client';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Post } from '@/type/type';
import { CATEGORY_ARR } from '@/constant/category';

interface Props {
  posts: Post[];
}

export default function BlogPageContent({ posts }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams);
  console.log(searchParams?.get('search') || '검색어 없음');
  const search = searchParams?.get('search') || '';
  console.log(searchParams?.get('category') || '카테고리 없음');
  const category = searchParams?.get('category') || '';
  // 검색어와 카테고리로 게시물 필터링
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === 'All' ? post : post.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto pb-8 px-4">
      <Tabs
        defaultValue={category}
        className="mb-8 w-fit"
        onValueChange={(value) => {
          window.location.href = `/blog?category=${value || 'All'}`;
        }}
        value={category}
      >
        <TabsList className="grid w-full grid-cols-6">
          {CATEGORY_ARR.map((value) => (
            <TabsTrigger key={value} value={value}>
              {value}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredPosts.map((post, index) => (
          <Card
            key={index}
            className="cursor-pointer animate-slideUpFade opacity-0"
            style={{ animationDelay: `${Math.floor(index / 4) * 150}ms` }}
            onClick={() => {
              router.push(`/post/${post.category}/${post.id}`);
            }}
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden h-[192px] w-full rounded-t-xl">
                <Image
                  src={post.image}
                  alt="썸네일"
                  className="object-cover transform transition-transform duration-300 hover:scale-105"
                  fill
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4 pt-[24px]">
              <div className="text-[24px] font-semibold line-clamp-1">
                {post.title}
              </div>
              <div className="text-[12px] text-stone-400 line-clamp-1 mb-4">
                {post.excerpt}
              </div>
              <div className="flex items-center justify-between w-full">
                <Badge variant="secondary">{post.category}</Badge>
                <time className="text-sm text-muted-foreground">
                  {post.dateString}
                </time>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">
          검색 결과가 없습니다.
        </p>
      )}
    </div>
  );
}
