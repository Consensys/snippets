import * as React from "react";

import { getSnippetsByModule } from "@/app/actions/snippets";
import ModuleSnippets from "@/components/module-snippets";
import { notFound } from "next/navigation";

export const revalidate = 0;

type PageProps = {
  params: {
    pkg: string;
    module: string;
  };
};

const Page = async ({ params }: PageProps) => {

  const snippets = await getSnippetsByModule(params.pkg, params.module);

  if(snippets.length === 0) {
    return notFound();
  }

  return <ModuleSnippets snippets={snippets} />;
};

export default Page;
