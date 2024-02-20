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
    <div className="relative w-full lg:max-w-2xl">
      <div className="absolute flex top-4 gap-2 right-4">
        <CopyToClipboard text={code} onCopy={handleCopy}>
          <Button variant="secondary">
            {isCopied ? "Copied!" : <Copy color="white" size="18px" />}
          </Button>
        </CopyToClipboard>
        {github && (
          <Button asChild variant="secondary">
            <Link target="_blank" href={github}>
              code <GithubIcon size={18} className="ml-1" />
            </Link>
          </Button>
        )}

        {types && (
          <Button asChild variant="secondary">
            <Link target="_blank" href={types}>
              types
              <Image
                alt="logo"
                className="ml-1"
                width={18}
                height={18}
                src="/images/typescript.svg"
              />
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
