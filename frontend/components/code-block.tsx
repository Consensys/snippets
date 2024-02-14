"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy } from "lucide-react";

const CodeBlock = ({
  code,
  print = false,
}: {
  code: string;
  print?: boolean;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="relative w-[700px]">
      {!print && (
        <CopyToClipboard text={code} onCopy={handleCopy}>
          <button className="absolute text-sm text-white bg-transparent border-none cursor-pointer top-4 right-4">
            {isCopied ? "Copied!" : <Copy color="white" size="18px" />}
          </button>
        </CopyToClipboard>
      )}
      <SyntaxHighlighter customStyle={{ borderRadius: 20, padding: 12, height: "100%"}} language="javascript" style={vscDarkPlus}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
