'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Post } from '@/lib/parsingPost';
import { CATEGORY } from '@/constant/category';

export default function BlogPageContent({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const param = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>(CATEGORY[0]);

  const filteredPosts =
    activeTab === CATEGORY[0]
      ? posts
      : posts.filter((post) => post.category === activeTab);

  useEffect(() => {
    setActiveTab(CATEGORY[Number(param.get('category')) || 0]);
  }, []);

  return (
    <div className="container mx-auto pb-8 px-4">
      <Tabs
        defaultValue={CATEGORY[0]}
        className="mb-8 w-fit"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-5">
          {CATEGORY.map((value) => (
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
            className="cursor-pointer"
            onClick={() => {
              router.push(`/post/${post.id}`);
            }}
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden h-[192px] w-full">
                <Image
                  src={'/png/beulping.png'}
                  alt="썸네일"
                  className="object-cover transform transition-transform duration-300 hover:scale-105"
                  fill
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4 gap-4 pt-[24px]">
              <h3 className="font-semibold line-clamp-1">{post.title}</h3>
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
          이 카테고리에는 아직 게시물이 없습니다.
        </p>
      )}
    </div>
  );
}
