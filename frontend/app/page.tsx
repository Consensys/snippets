import React, { FC } from "react";
import Card from "@/components/card";
import Hero from "@/components/hero";
import { getModules, getSnippetsByModule } from "./actions/receipts";

export const revalidate = 0

export default async function Page(): Promise<JSX.Element> {
  
  const modules = await getModules();

  console.log(modules, 'modules')
  return (
    <div className="flex flex-col gap-4 w-full">
      <Hero />
      <div className="grid grid-cols-3 gap-4 w-full">
        {modules.map(({ key, title, description, }) => (
          <Card
            key={1}
            name={title}
            to={`/${encodeURIComponent(key)}`}
            description={description}
           // image={image}
            // links={[
            //   { title: "Docs", href: module.docs },
            //   { title: "API", href: module.api },
            // ]}
          />
        ))}
      </div>
    </div>
  );
}
