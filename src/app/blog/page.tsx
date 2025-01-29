import BlogPageContent from '@/components/blog/BlogPageContent';
import { getSortedContentList } from '@/lib/parseContent';
import { Post } from '@/type/type';

export default async function BlogPage() {
  const myPosts = (await getSortedContentList('posts')) as Post[];
  // const category = (decodeURIComponent(searchParams.category || '') ||
  //   CATEGORY_ARR[0]) as CategoryType;
  // const search = decodeURIComponent(searchParams.search || '');

  // console.log('category', category);
  // console.log('search', search);

  // const filteredPosts =
  //   !category || category === CATEGORY_ARR[0]
  //     ? myPosts
  //     : myPosts.filter((post) => post.category === category);
  // const filteredPostsBySearch = filteredPosts.filter(
  //   (post) =>
  //     post.title.toLowerCase().includes(search.toLowerCase()) ||
  //     post.excerpt.toLowerCase().includes(search.toLowerCase())
  // );

  return <BlogPageContent posts={myPosts} />;
}
