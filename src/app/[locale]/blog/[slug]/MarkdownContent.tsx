'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// The post title is already the page's single <h1> (BlogPostView hero). Many CMS
// bodies start with the same title as a "# " heading, which produced a second H1:
// drop that leading line and render any other "# " heading as an <h2>.
const withoutLeadingTitle = (md: string) => md.replace(/^\s*#\s+[^\n]*\n+/, '');

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{ h1: ({ node: _node, ...props }) => <h2 {...props} /> }}
    >
      {withoutLeadingTitle(content)}
    </ReactMarkdown>
  );
}
