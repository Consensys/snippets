import * as React from "react";

import { getSnippetsByModule } from "@/app/actions/receipts";
import PackageNav from "@/components/package-nav";

export const revalidate = 0;

type PageProps = {
  params: {
    module: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const snippets = await getSnippetsByModule(decodeURIComponent(params.module));

  return <PackageNav snippets={snippets} />;
};

export default Page;
