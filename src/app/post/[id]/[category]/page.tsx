import CategoryTag from '@/components/all/CategoryTag';
import Giscus from '@/components/all/Giscus';
import PostIndex from '@/components/all/PostIndex';
import PostBody from '@/components/ui/PostBody';
import ProgressBar from '@/components/post/ProgressBar';
import { BASE_POSTS_PATH } from '@/constant/path';
import { parsePost } from '@/lib/parseContent';
import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';
import { CategoryType } from '@/type/type';

export default async function Page({
  params,
}: {
  params: { id: string; category: CategoryType };
}) {
  console.log(params);
  const BASE_PATH = BASE_POSTS_PATH;
  const p = await parsePost(`${BASE_PATH}/${params.id}/${params.category}.mdx`);

  return (
    <>
      <ProgressBar />
      <div className="px-5 container mx-auto max-w-[768px] relative">
        <Image
          src={p.image}
          alt={`${p.title} 썸네일 이미지`}
          width={100}
          height={100}
          className="object-center w-fit h-36 mb-2 mx-auto"
        />
        <div className="flex flex-col gap-2 mb-2">
          <CategoryTag category={p.category} />
          <h1 className="text-[40px]">{p.title}</h1>
          <p className="text-gray-600 text-sm">
            {dayjs(p.date).format('YYYY. MM. DD')}
          </p>
        </div>
        <hr className="py-2" />
        <PostIndex />
        <PostBody contentData={p.content} />
        <Giscus />
      </div>
    </>
  );
}
