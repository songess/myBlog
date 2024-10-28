import PostBody from '@/components/ui/PostBody';
import { getSortedPostList, parsePost  } from '@/lib/parsingPost';
import React from 'react';

const BASE_PATH = 'public/posts/post';

export default async function Page({ params }: { params: { id: string } }) {
  console.log(params);
  const p = await parsePost(`${BASE_PATH}/contents.mdx`);
  const c = await getSortedPostList('post');
  return;
    <div className="px-5">
      <PostBody contentData={p.content} />
    </div>
}
