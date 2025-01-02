import BlogPageContent from '@/components/blog/BlogPageContent';
import { CATEGORY_ARR } from '@/constant/category';
import { getSortedContentList } from '@/lib/parseContent';
import { CategoryType, Post } from '@/type/type';
import { headers } from 'next/headers';

export default async function BlogPage() {
  const myPosts = await getSortedContentList('posts') as Post[];
  const category = decodeURIComponent(
    headers().get('x-query-category') || ''
  ) as CategoryType;
  const search = decodeURIComponent(headers().get('x-query-search') || '');

  const filteredPosts =
    !category || category === CATEGORY_ARR[0]
      ? myPosts
      : myPosts.filter((post) => post.category === category);
  const filteredPostsBySearch = filteredPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  return <BlogPageContent posts={filteredPostsBySearch} category={category} />;
}
