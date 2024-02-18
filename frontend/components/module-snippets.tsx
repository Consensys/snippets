"use client";

import * as React from "react";

import { Badge, badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Snippet from "./snippet";
import MenuCard from "./menu-card";
import Link from "next/link";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

type PageProps = {
  snippets: any[];
};

const ModuleSnippets = ({ snippets }: PageProps) => {
  const [selectedSnippet, setSelectedSnippet] = React.useState(snippets[0]);

  return (
    <div className="flex flex-col px-3 gap-2 w-full">
      <div className="w-full mb-8">
        <div className="mt-4 flex items-center flex-col gap-2">
          <h2 className="text-3xl font-semibold text-transparent mb-2 bg-gradient-to-br bg-clip-text  from-white to-slate-400">
            {selectedSnippet.title}
          </h2>
<p className="text-sm max-w-3xl">{selectedSnippet.description}</p>
          <div className="flex gap-2">
            {selectedSnippet.docs && (
              <Button  className="text-gray-600 bg-gray-50">
                <Link target="_blank" href={selectedSnippet.docs} className="flex">
                  Docs
                  <ExternalLink size={16} className="ml-1" />
                </Link>
              </Button>
            )}

            {selectedSnippet.api && (
              <Button asChild className="text-gray-600 ">
                <Link target="_blank" href={selectedSnippet.api}>
                  API
                  <ExternalLink size={16} className="ml-1" />
                </Link>
              </Button>
            )}
          </div>
        </div>

      </div>

      <div className="flex lg:flex-row flex-col gap-4 flex-grow">
        <div className="flex flex-row lg:flex-col gap-2 mt-2">
          {snippets?.map((snippet, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedSnippet(snippet);
              }}
            >
              <MenuCard
                key={1}
                name={snippet.title}
                description={snippet.description}
                isSelected={selectedSnippet.title === snippet.title}
              />
            </div>
          ))}
        </div>
        {selectedSnippet && <Snippet snippet={selectedSnippet} />}
      </div>
    </div>
  );
};

export default ModuleSnippets;
