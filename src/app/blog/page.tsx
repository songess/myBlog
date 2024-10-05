'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import BlogHeader from '@/components/all/BlogHeader';
import { DUMMYposts } from '@/constant/data';
import { useRouter } from 'next/navigation';

export default function BlogPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('All');
  const posts = DUMMYposts;

  const filteredPosts =
    activeTab === 'All'
      ? posts
      : posts.filter((post) => post.category === activeTab);

  return (
    <div className="container mx-auto pb-8">
      <BlogHeader />

      <Tabs
        defaultValue="All"
        className="mb-8 w-fit"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="All">전체</TabsTrigger>
          <TabsTrigger value="운영체제">운영체제</TabsTrigger>
          <TabsTrigger value="FE">FE</TabsTrigger>
          <TabsTrigger value="CS">CS</TabsTrigger>
          <TabsTrigger value="일상">일상</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <Card
            key={post.id}
            className="cursor-pointer transform transition-transform duration-300 hover:scale-105"
            onClick={() => {
              router.push(`/post/${post.id}`);
            }}
          >
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Badge variant="secondary">{post.category}</Badge>
              <time className="text-sm text-muted-foreground">{post.date}</time>
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
