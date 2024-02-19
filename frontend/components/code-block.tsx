"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy, GithubIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const CodeBlock = ({
  code,
  github,
  types,
}: {
  code: string;
  github?: string;
  types: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="relative w-[700px]">
      <div className="absolute flex top-4 right-4">
        <CopyToClipboard text={code} onCopy={handleCopy}>
          <Button className=" text-sm p-2 text-white bg-transparent border-none cursor-pointer ">
            {isCopied ? "Copied!" : <Copy color="white" size="18px" />}
          </Button>
        </CopyToClipboard>
        {github && (
          <Button asChild className="text-slate-400 p-2">
            <Link target="_blank" href={github}>
              <GithubIcon size={18} />
            </Link>
          </Button>
        )}

        {types && (
          <Button asChild className="text-slate-400 p-2">
            <Link target="_blank" href={types}>
            <Image alt="logo" width={18} height={18} src="/images/typescript.svg" />
            </Link>
          </Button>
        )}
      </div>

      <SyntaxHighlighter
        customStyle={{ borderRadius: 20, paddingTop: 60, height: "100%" }}
        language="javascript"
        style={vscDarkPlus}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
