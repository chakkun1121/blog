import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function CodeBlock({
  children: {
    props: { className, children },
  },
}: {
  children: any;
}) {
  const match = /language-(\w+)/.exec(className || "");
  const language = match && match[1] ? match[1] : "";
  const code = String(children).replace(/\n$/, "");
  return (
    <div className="pl-6">
      <SyntaxHighlighter
        language={language}
        style={vs}
        className="block overflow-x-scroll rounded"
        showLineNumbers={true}
        customStyle={{ tabSize: 2 }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
