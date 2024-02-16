import Image from "next/image";
import Link from "next/link";

export const Nav = async () => {
  return (
    <nav className="flex items-center justify-between py-4 max-w-screen-2xl mx-auto">
      <Link href="/" className="flex flex-col">
        <Image alt="logo" width={150} height={40} src="./phosphor.svg" />
        <p className="text-2xl text-purple-400"> {"<snippets/>"}</p>
      </Link>
    </nav>
  );
};
