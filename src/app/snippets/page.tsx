import SnippetsPageContent from '@/components/snippets/SnippetsPageConent';
import { getSortedContentList } from '@/lib/parseContent';
import { Snippet } from '@/type/type';

export default async function SnippetsPage() {
  const snippets = (await getSortedContentList('snippets')) as Snippet[];
  return <SnippetsPageContent snippets={snippets} />;
}
