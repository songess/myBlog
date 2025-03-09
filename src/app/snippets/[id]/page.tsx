import Giscus from '@/components/all/Giscus';
import PostIndex from '@/components/all/PostIndex';
import PostBody from '@/components/ui/PostBody';
import { Badge } from '@/components/ui/badge';
import { BASE_SNIPPETS_PATH } from '@/constant/path';
import { parseSnippet } from '@/lib/parseContent';
import dayjs from 'dayjs';
import React from 'react';

export default async function Page({ params }: { params: { id: string } }) {
  const BASE_PATH = BASE_SNIPPETS_PATH;
  const p = await parseSnippet(`${BASE_PATH}/${params.id}.mdx`);

  return (
    <div className="px-5 container mx-auto max-w-[768px]">
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex gap-2">
          {p.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-[40px]">{p.title}</h1>
        <p className="text-gray-600 text-sm">
          {dayjs(p.date).format('YYYY. MM. DD')}
        </p>
      </div>
      <hr className="py-2" />
      <PostBody contentData={p.content} />
      <Giscus />
    </div>
  );
}
