"use client";

import * as React from "react";

import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Snippet from "./snippet";
import MenuCard from "./menu-card";

type PageProps = {
  snippets: any[];
};

const PackageNav = ({ snippets }: PageProps) => {
  const [selectedSnippet, setSelectedSnippet] = React.useState(snippets[0]);

  return (
    <div className="flex flex-col space-y-8">
      <div className="grid grid-cols-4 gap-2 w-full overflow-auto py-4">
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
            />
          </div>
        ))}
      </div>

      <div className="w-4/5">
        <div className="w-full rounded-xl ">
          <ul className="flex flex-wrap gap-2 ">
            {selectedSnippet.data?.map((data, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedSnippet(data);
                }}
                className={cn(
                  badgeVariants({ variant: "outline" }),
                  "cursor-pointer font-semibold text-transparent block bg-gradient-to-br bg-clip-text hover:opacity-40 from-white to-slate-400"
                )}
              >
                {data.name}
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="self-start">
        {selectedSnippet && <Snippet snippet={selectedSnippet} />}
      </div>
      <div>
        <h5 className="text-gray-200 mb-12 block text-xl leading-8 font-bold tracking-tight md:text-2xl">
          More goodies
        </h5>
      </div>
    </div>
  );
};

export default PackageNav;
