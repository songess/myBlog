import { getSortedPostList, parsePost } from '@/lib/parsingPost';
import React from 'react';

const BASE_PATH = 'public/posts/post';

export default async function Page({ params }: { params: { id: string } }) {
  console.log(params);
  const p = await parsePost(`${BASE_PATH}/contents.mdx`);
  const c = await getSortedPostList('post');
  return;
  <>
    <div>{p.content}</div>;
  </>;
}
