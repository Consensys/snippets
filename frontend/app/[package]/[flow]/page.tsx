import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { getCheats } from "../../actions/package";
import CodeBlock from "@/components/code-block";
import { GithubIcon } from "lucide-react";
import QRCodeContainer from "@/components/qr-code";
export const revalidate = 0;

type PageProps = {
  params: {
    package: string;
    flow: string;
  };
  searchParams: {
    print: boolean;
  };
};

const Package = async ({ params, searchParams }: PageProps) => {
  const allCheats = await getCheats(params.package);
  const flowCheats = allCheats.filter(
    (cheat) => cheat.flow === decodeURIComponent(params.flow)
  );

  // const cheats = allCheats[searchParams.flow] || [];
  return (
    <main className="flex flex-col items-center min-h-screen p-24">
      <div className="grid w-full max-w-5xl grid-cols-2 gap-4 font-mono text-sm">
        {flowCheats
          .sort((a, b) => Number(a.step) - Number(b.step))
          .map((cheat) => (
            <div className="flex relative flex-col justify-between w-full px-4 transition duration-200 border border-white overflow-auto shadow-md h-[350px] py-7 bg-gradient-to-b from-slate-100 to-transparent rounded-2xl transform-gpu hover:shadow-lg hover:scale-105 dark:bg-gradient-to-b dark:border-gray-700 dark:from-gray-800 dark:to-transparent dark:backdrop-filter dark:backdrop-blur-md">
              <p>{cheat.title}</p>
              <p>{cheat.description}</p>
              <div className="absolute flex items-center justify-center w-8 h-8 border-2 border-gray-800 rounded-full top-1 right-1">
                <p className="text-md">{cheat.step}</p>
              </div>
              <CodeBlock code={cheat.code} print={searchParams.print} />
              <div className="flex">
                <Link href={cheat.link}>
                  <GithubIcon />
                </Link>
                {searchParams.print && <QRCodeContainer link={cheat.link} />}
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default Package;
