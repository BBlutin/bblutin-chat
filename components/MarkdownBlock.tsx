// @ts-nocheck

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import rangeParser from "parse-numeric-range";

const MarkdownBlock = ({ content }: { content: string }) => {
  const syntaxTheme = oneLight;

  const MarkdownComponents: object = {
    code({ node, inline, className, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const hasMeta = node?.data?.meta;

      const applyHighlights: object = (applyHighlights: number) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/;
          const metadata = node.data.meta?.replace(/\s/g, "");
          const strlineNumbers = RE?.test(metadata)
            ? RE?.exec(metadata)[1]
            : "0";
          const highlightLines = rangeParser(strlineNumbers);
          const highlight = highlightLines;
          const data: string = highlight.includes(applyHighlights)
            ? "highlight"
            : null;
          return { data };
        } else {
          return {};
        }
      };

      return match ? (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={match[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={true}
          showInlineLineNumbers={true}
          wrapLines={true}
          customStyle={{
            margin: 0,
            wordBreak: "break-all",
            whiteSpace: "pre-wrap",
            boxShadow: "0px 2px 4px rgba(50,50,93,.1)",
          }}
          useInlineStyles={true}
          lineProps={
            (applyHighlights,
            { style: { wordBreak: "break-all", whiteSpace: "pre-wrap" } })
          }
          {...props}
        />
      ) : (
        <code className={className} {...props} />
      );
    },
  };

  return (
    <ReactMarkdown components={MarkdownComponents}>{content}</ReactMarkdown>
  );
};

export default MarkdownBlock;
