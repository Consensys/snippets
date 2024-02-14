import React, { FC } from "react";
import { getAllPackages } from "./actions/package";
import Card from "@/components/card";
import Hero from "@/components/hero";
import { getCheats } from "./actions/package";

export default async function Page(): Promise<JSX.Element> {
  // const receiptPackages = await getAllPackages();
  const pkgs = await getAllPackages();
  console.log(pkgs, "pkgs");
  return (
    <div className="flex flex-col gap-4 w-full">
      <Hero />
      <div className="grid grid-cols-3 gap-4 w-full">
        {pkgs.map(({ name, description, packageName, image }) => (
          <Card
            key={1}
            name={name}
            to={`/${packageName}`}
            description={description}
            image={image}
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
