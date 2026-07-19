"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  markdown: string;
}

export default function MarkdownReport({
  markdown,
}: Props) {
  return (
    <section className="rounded-3xl border border-gray-800 bg-gray-950 p-8">

      <h2 className="mb-8 text-3xl font-bold">
        DevScope AI Analysis
      </h2>

      <article
        className="
          prose
          prose-invert
          prose-headings:text-violet-400
          prose-headings:font-bold
          prose-h1:text-4xl
          prose-h2:text-2xl
          prose-h3:text-xl
          prose-p:text-gray-300
          prose-li:text-gray-300
          prose-strong:text-white
          prose-code:text-violet-300
          prose-pre:bg-gray-900
          prose-table:border
          prose-th:bg-violet-600
          prose-th:text-white
          prose-td:border
          prose-td:border-gray-700
          max-w-none
        "
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdown}
        </ReactMarkdown>
      </article>

    </section>
  );
}