"use client";

import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import Link from "next/link";
import CodeBlock from "@/components/code-block";
import { getModules, getReceipts } from "@/app/actions/receipts";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Card from "@/components/card";
import Snippet from "./snippet";
import MenuCard from "./menu-card";

export const revalidate = 0;

type PageProps = {
  snippets: any[];
  currentPackage: any;
};

const PackageNav = ({
  snippets: initialSnippets,
  currentPackage,
}: PageProps) => {
  const snippets = [...initialSnippets];
  const [selectedModule, setSelectedModule] = React.useState(snippets[0]);
  const [selectedSnippet, setSelectedSnippet] = React.useState(
    snippets[0].data[0]
  );
console.log(currentPackage?.videos)
  return (
    <div className="flex flex-col space-y-8">
      <div className="flex gap-2 w-full  py-4">
        {snippets?.map((snippet, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedModule(snippet);
              setSelectedSnippet(snippet.data[0]);
            }}
          >
            <MenuCard
              key={1}
              name={snippet.module.title}
              description={snippet.module.description}
            />
          </div>
        ))}
      </div>

      <div className="w-4/5">
        <div className="w-full rounded-xl ">
          <ul className="flex flex-wrap gap-2 ">
            {selectedModule.data?.map((data, index) => (
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
                {data.title}
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

        {currentPackage?.videos?.map((video, index) => (
          <iframe
          key={index}
          width="550"
          height="320"
          src={`https://www.youtube.com/embed/${video}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        ))}
      </div>
    </div>
    // <>
    //   <NavigationMenu>
    //     <NavigationMenuList>
    //       {snippets?.map(({ module, data }) => (
    //         <NavigationMenuItem key={module.title}>
    //           <NavigationMenuTrigger>
    //             <div className="text-transparent bg-gradient-to-br bg-clip-text  from-white to-slate-400">
    //               {module.title}
    //             </div>
    //           </NavigationMenuTrigger>
    //           <NavigationMenuContent>
    //             <div className="grid gap-3 p-4 md:w-[400px] bg-slate-700 lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
    //               {data.map((data, index) => (
    //                 <div key={index} onClick={() => setSelected(data)}>
    //                   <MenuCard
    //                     name={data.title}
    //                     description={data.description}
    //                   />
    //                 </div>
    //               ))}
    //             </div>
    //           </NavigationMenuContent>
    //         </NavigationMenuItem>
    //       ))}
    //     </NavigationMenuList>
    //   </NavigationMenu>

    // </>
  );

  // return (
  //   <main className="flex min-h-screen">
  //     <div className="flex flex-col gap-4 w-full items-center">
  //     {snippets?.map(({ module }) => (
  //         <Card
  //           key={1}
  //           name={module.title}
  //           description={module.description}
  //        //   to={`/${params.package}/${name}`}
  //           // links={[
  //           //   { title: "Docs", href: module.docs },
  //           //   { title: "API", href: module.api },
  //           // ]}
  //         />
  //       ))}
  //     </div>
  //   </main>
  // );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default PackageNav;
