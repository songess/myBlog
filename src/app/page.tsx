import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import dayjs from 'dayjs';
import { getSortedContentList } from '@/lib/parseContent';
import { Post } from '@/type/type';

export default async function Page() {
  const posts = (await getSortedContentList('posts')) as Post[];
  return (
    <main className="container mx-auto px-4 h-full">
      <section className="mb-16 animate-fadeIn opacity-0">
        <h1 className="text-4xl font-bold mb-4">열심히 살기</h1>
        <p className="text-xl text-muted-foreground mb-4">
          안녕하세요🙂
          <br />
        </p>
      </section>

      <section className="animate-fadeIn delay-150 opacity-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">나의 포스팅</h2>
          <Button variant="ghost" className="text-muted-foreground" asChild>
            <Link href="/blog?category=All">모든 글 보기 →</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.slice(0, 4).map((post, index) => (
            <Link key={index} href={`/post/${post.category}/${post.id}`}>
              <Card key={index} className="cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden h-[192px] w-full">
                    <Image
                      src={post.image}
                      alt="썸네일"
                      className="object-cover transform transition-transform duration-300 hover:scale-105"
                      fill
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start p-4">
                  <time className="text-sm text-muted-foreground mb-2">
                    {dayjs(post.date).format('YYYY년 MM월 DD일')}
                  </time>
                  <h3 className="font-semibold">{post.title}</h3>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
