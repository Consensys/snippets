import React from "react";
import Card from "@/components/card";
import Hero from "@/components/hero";
import { getPackages } from "./actions/snippets";

export const revalidate = 0;

export default async function Page(): Promise<JSX.Element> {
  const pkgs = await getPackages();

  return (
    <div className="flex flex-col gap-4 w-full">
      <Hero />
      <div className="grid grid-cols-3 gap-4 w-full">
        {
          // hardcoding the phosphor package for now
        }
        {pkgs["phosphor"].map(({ key, title, description }) => (
          <Card
            key={key}
            name={title}
            to={`/phosphor/${encodeURIComponent(key)}`}
            description={description}
          />
        ))}
      </div>
    </div>
  );
}
