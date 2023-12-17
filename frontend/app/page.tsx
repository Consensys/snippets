import Image from "next/image";
import { getAllPackages } from "./actions/package";
import Link from "next/link";

export const revalidate = 0;
export default async function Home() {

  const packages = getAllPackages();

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      {/* <div className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm lg:flex">
        {packages.map((pkg) => (
          <Link href={`/${pkg}`}>{pkg}</Link>
        ))}
      </div> */}
    </main>
  );
}
