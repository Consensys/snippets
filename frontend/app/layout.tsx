import Head from "next/head";
import { Nav } from "@/components/nav";
import "../styles/globals.css";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="transition-colors bg-[#212429]">
        <div className="relative text-primary-black min-h-screen">
          <Head>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="container lg:max-w-6xl py-10 mx-auto">
   
            <Nav />
            <div>

            {children}
            </div>
          </main>
        </div>
        <div className="-z-10 w-full h-[70vh] absolute top-0 left-0 bg-dark-pattern bg-no-repeat bg-cover lg:bg-[length:100%_100%]"></div>
      </body>
    </html>
  );
};

export default Layout;
