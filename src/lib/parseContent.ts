import dayjs from 'dayjs';
import { readFileSync } from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { sync } from 'glob';
import {
  Post,
  PostMatter,
  Snippet,
  SnippetMatter,
  Log,
  LogMatter,
} from '@/type/type';

const BASE_PATH = 'public/articles';
const CONTENT_PATH = path.join(process.cwd(), BASE_PATH);

type ContentType = 'posts' | 'snippets' | 'logs';

// 메타데이터 파싱 및 dateString 변환
const parseContentDetail = async <
  T extends PostMatter | SnippetMatter | LogMatter
>(
  contentPath: string
) => {
  const file = readFileSync(contentPath, 'utf8');
  const { data, content } = matter(file);
  const grayMatter = data as T;
  const dateString = dayjs(grayMatter.date)
    .locale('ko')
    .format('YYYY년 MM월 DD일');
  return { ...grayMatter, dateString, content };
};

// Post 파싱
export const parsePost = async (contentPath: string): Promise<Post> => {
  const detail = await parseContentDetail<PostMatter>(contentPath);
  return { ...detail } as Post;
};

// Snippet 파싱
export const parseSnippet = async (contentPath: string): Promise<Snippet> => {
  const detail = await parseContentDetail<SnippetMatter>(contentPath);
  return { ...detail } as Snippet;
};

// log 파싱
export async function parseLog(contentPath: string): Promise<Log> {
  const detail = await parseContentDetail<LogMatter>(contentPath);
  return { ...detail } as Log;
}

// 컨텐츠 경로를 가져오는 함수
export const getContentPaths = (type: ContentType, category?: string) => {
  const folder = category || '**';
  const contentPaths: string[] = sync(
    `${CONTENT_PATH}/${type}/${folder}/*.mdx`
  );
  return contentPaths;
};

// 컨텐츠 리스트를 가져오는 함수
const getContentList = async <T extends Post | Snippet | Log>(
  type: ContentType,
  category?: string
): Promise<T[]> => {
  const contentPaths = getContentPaths(type, category);
  const parser =
    type === 'posts' ? parsePost : type === 'logs' ? parseLog : parseSnippet;
  const contentList = await Promise.all(
    contentPaths.map((contentPath) => parser(contentPath)) as Promise<T>[]
  );
  return contentList;
};

// 컨텐츠를 날짜 최신순으로 정렬
const sortContentList = <T extends Post | Snippet | Log>(contentList: T[]) => {
  return contentList.sort((a, b) => (a.date > b.date ? -1 : 1));
};

// 정렬된 컨텐츠 리스트 반환함수
export const getSortedContentList = async <T extends Post | Snippet | Log>(
  type: ContentType,
  category?: string
): Promise<T[]> => {
  const contentList = await getContentList<T>(type, category);
  return sortContentList<T>(contentList);
};
