import LogContent from '@/components/log/LogContent';
import { getSortedContentList } from '@/lib/parseContent';
import { Log } from '@/type/type';

export default async function LogPage() {
  const logs = (await getSortedContentList('logs')) as Log[];
  return <LogContent logs={logs} />;
}
