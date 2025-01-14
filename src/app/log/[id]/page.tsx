import { parseLog } from '@/lib/parseContent';
import dayjs from 'dayjs';
import PostBody from '@/components/ui/PostBody';
import { BASE_LOGS_PATH } from '@/constant/path';
import PostIndex from '@/components/all/PostIndex';

export default async function LogPage({ params }: { params: { id: string } }) {
  const BASE_PATH = BASE_LOGS_PATH;
  const log = await parseLog(`${BASE_PATH}/${params.id}.mdx`);

  return (
    <div className="px-5 container mx-auto max-w-[768px] mb-[40px]">
      <div className="flex flex-col gap-2 mb-2">
        <h1 className="text-[40px]">{log.title}</h1>
        <p className="text-gray-600 text-sm">
          {dayjs(log.date).format('YYYY. MM. DD')}
        </p>
      </div>
      <hr className="py-2" />
      <PostIndex />
      <PostBody contentData={log.content} />
    </div>
  );
}
