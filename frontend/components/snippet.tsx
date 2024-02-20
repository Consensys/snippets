"use client";

import CodeBlock from "@/components/code-block";

type PageProps = {
  snippet: any;
};

const Snippet = ({ snippet }: PageProps) => {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <CodeBlock code={snippet.code} github={snippet.link} types={snippet.typeDefs} />
    </div>
  );
};

export default Snippet;
