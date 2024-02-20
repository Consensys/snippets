"use client";

import * as React from "react";

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
          <h2 className="text-3xl font-semibold text-transparent mb-1 bg-gradient-to-br bg-clip-text  from-white to-slate-400">
            {selectedSnippet.title}
          </h2>
          <div className="flex gap-2">
            {selectedSnippet.docs && (
              <Button asChild variant="secondary">
                <Link
                  target="_blank"
                  href={selectedSnippet.docs}
                  className="flex"
                >
                  Docs
                  <ExternalLink size={16} className="ml-1" />
                </Link>
              </Button>
            )}

            {selectedSnippet.api && (
              <Button asChild variant="link" className="text-slate-100 ">
                <Link target="_blank" href={selectedSnippet.api}>
                  API
                  <ExternalLink size={16} className="ml-1" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3 mt-2 w-full h-fit lg:max-w-sm flex-wrap">
          {snippets?.map((snippet, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedSnippet(snippet);
              }}
              className="h-fit"
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
