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
import { getAllPackages, getCheats } from "../actions/package";
import PackageNav from "@/components/package-nav";

export const revalidate = 0;

type PageProps = {
  params: {
    package: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const snippets = await getCheats(decodeURIComponent(params.package));
  const packages = await getAllPackages();

  const currentPackage = packages.find(
    (p) => p.packageName === decodeURIComponent(params.package)
  );

  // const [snippets, setSnippets] = React.useState<any[]>([]);
  console.log(snippets, "snippets");
  // React.useEffect(() => {
  //   const getSnippets = async () => {
  //     const snippets = await getCheats(params.package);
  //     console.log("snippets", snippets);
  //     setSnippets(snippets);
  //   }

  //   getSnippets();
  // }, [params.package]);

  // console.log("snippets", snippets);

  return (
    <PackageNav snippets={snippets} currentPackage={currentPackage} />
    // <NavigationMenu>
    //   <NavigationMenuList>
    //     {

    //     }
    //     <NavigationMenuItem>
    //       <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
    //       <NavigationMenuContent>
    //         <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
    //           <ListItem href="/docs" title="Introduction">
    //             Re-usable components built using Radix UI and Tailwind CSS.
    //           </ListItem>
    //           <ListItem href="/docs/installation" title="Installation">
    //             How to install dependencies and structure your app.
    //           </ListItem>
    //           <ListItem href="/docs/primitives/typography" title="Typography">
    //             Styles for headings, paragraphs, lists...etc
    //           </ListItem>
    //         </ul>
    //       </NavigationMenuContent>
    //     </NavigationMenuItem>

    //   </NavigationMenuList>
    // </NavigationMenu>
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

// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <a
//           ref={ref}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//             className
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//             {children}
//           </p>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   );
// });
// ListItem.displayName = "ListItem";

export default Page;
