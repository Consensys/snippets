"use client";
// // import React from "react";
// // import { getAllPackages } from "../actions/package";
// // import Link from "next/link";
// // export const revaidate = 0;
// // const NavBar = async () => {
// //     const packages = await getAllPackages();
// //     console.log("packages", packages)

// //     return (
// //         <nav className="flex flex-col items-center justify-between min-h-screen p-24">
// //             <div className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm lg:flex">
// //                 {/* {packages.map((pkg) => (
// //                     <Link href={`/${pkg}`}>{pkg.name}</Link>
// //                 ))} */}
// //             </div>
// //         </nav>
// //     );

// // }

// // export default NavBar;

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { CheatFlow } from "../app/actions/package";

export default function NavigationMenuDemo({ packages }: any) {
  const packagesJson: {
    name: string | undefined;
    flows: CheatFlow;
  }[] = JSON.parse(packages);
  console.log("packagesJson", packagesJson);
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {packagesJson.map(({ name, flows }) => (
          <NavigationMenuItem>
            <NavigationMenuTrigger>{name}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
               
                {Object.keys(flows).map((key) => (
                   <li className="row-span-3">
                   <NavigationMenuLink asChild>
                     <a
                       className="flex flex-col justify-end w-full h-full p-6 no-underline rounded-md outline-none select-none bg-gradient-to-b from-muted/50 to-muted focus:shadow-md"
                       href={`/${name}/${key}`}
                     >
                       <div className="mt-4 mb-2 text-lg font-medium">
                         {key}
                       </div>
                       <p className="text-sm leading-tight text-muted-foreground">
                         Beautifully designed components built with Radix UI and
                         Tailwind CSS.
                       </p>
                     </a>
                   </NavigationMenuLink>
                 </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

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
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
