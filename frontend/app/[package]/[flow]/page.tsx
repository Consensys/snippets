import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { getCheats } from "../../actions/package";
import CodeBlock from "@/components/code-block";
import { GithubIcon, QrCode } from "lucide-react";
import QRCode from "qrcode.react";
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
  const flowCheats = allCheats.filter((cheat) => cheat.flow === params.flow);
  console.log("flow", flowCheats)
 // const cheats = allCheats[searchParams.flow] || [];
  return (
    <main className="flex flex-col items-center min-h-screen p-24">
        <Link href="?print=true">Print</Link>
      <div className="items-center w-full max-w-5xl font-mono text-sm  lg:flex">
        {flowCheats.map((cheat) => (
          <div   className="flex flex-col justify-between px-4 transition duration-200 border border-white shadow-md w-fit py-7 bg-gradient-to-b from-slate-100 to-transparent rounded-2xl transform-gpu hover:shadow-lg hover:scale-105 dark:bg-gradient-to-b dark:border-gray-700 dark:from-gray-800 dark:to-transparent dark:backdrop-filter dark:backdrop-blur-md">
            <p>{cheat.title}</p>
            <p>{cheat.description}</p>
            <CodeBlock code={cheat.code} print={searchParams.print} />
            <div>
              {searchParams.print ? (
                <QrCode values={cheat.link} />
              ) : (
                <Link href={cheat.link}>
                  <GithubIcon />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Package;
