import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode, { type Options } from 'rehype-pretty-code';

interface Props {
  contentData: string;
}

/** TODO
 * 코드블럭 테마 추가하기 (다크모드일 때 자동으로 바뀌게,, 하고싶당)
 */
const prettyCodeOptions: Options = {
  keepBackground: true,
  theme: 'slack-dark',
};

function PostBody({ contentData }: Props) {
  return (
    <main className="codeBlock ">
      <MDXRemote
        source={contentData}
        options={{
          mdxOptions: {
            rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
          },
        }}
      />
    </main>
  );
}

export default PostBody;
