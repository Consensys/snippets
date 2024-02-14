import Link from "next/link";
import CodeBlock from "@/components/code-block";
import { getReceipts } from "@/app/actions/receipts";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const revalidate = 0;

type PageProps = {
  params: {
    module: string;
    package: string;
  };
};

const ModuleSnippets = async ({ params }: PageProps) => {
  const reciptModule = params.module;

  const receiptPackage = params.package;

  const receipts = await getReceipts(receiptPackage, reciptModule);

  console.log("reccccccc===========", receipts);

  const consolidatedTypes = receipts?.types.reduce((acc = "", type) => {
    return acc + type.definition + "\n\n";
  });

  return (
    <main className="flex min-h-screen">
      <div className="flex flex-col gap-4 w-full items-center">
        <div className="w-full rounded-xl md:mb-12">
          <ul className="flex flex-wrap gap-2 ">
            {receipts?.functions?.map((receipt, index) => (
              <Link
                key={index}
                href={`#${receipt.title.replace(/\s+/g, "-").toLowerCase()}`}
                className={cn(
                  badgeVariants({ variant: "outline" }),
                  "font-semibold text-transparent block bg-gradient-to-br bg-clip-text hover:opacity-40 from-white to-slate-400"
                )}
              >
                {receipt.title}
              </Link>
            ))}
          </ul>
        </div>

        <div className="flex">
          <div>
            {receipts?.functions.map((receipt, index) => (
              <div
                className="w-full mb-12"
                key={receipt.id}
                id={receipt.title.replace(/\s+/g, "-").toLowerCase()}
              >
                <div className="text-transparent mb-8 bg-gradient-to-br bg-clip-text  from-white to-slate-400">
                  <div>
                    <div className="mt-4 flex items-center  gap-2">
                      <h2 className="text-2xl font-semibold text-transparent mb-2 bg-gradient-to-br bg-clip-text  from-white to-slate-400">
                        {receipt.title}
                      </h2>
                      <div className="flex gap-2">
                        <Link
                          target="_blank"
                          href="https://docs.phosphor.xyz/platform-features/digital-asset-creation/collections"
                        >
                          <div className=" rounded-[10px] text-sm px-2 py-[0.5] bg-green-500 text-white w-fit text-primary-foreground hover:bg-green-500/80">
                            Docs
                          </div>
                        </Link>

                        <Link
                          target="_blank"
                          href=" https://docs.phosphor.xyz/latest-admin-api#tag/Collection"
                        >
                          <div className=" rounded-[10px] text-sm  px-2 py-[0.5] bg-blue-500 text-white w-fit text-primary-foreground hover:bg-blue-500/80">
                            API
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm max-w-3xl">{receipt.description}</p>

                  <div>
                    {receipt.docs && (
                      <Button variant="secondary">
                        <Link target="_blank" href={receipt.docs}>
                          Docs
                        </Link>
                      </Button>
                    )}
                    {receipt.api && (
                      <span className="py-1 px-2 text-xs rounded-xl inline-block whitespace-nowrap text-center bg-sky-200 text-cyan-600 align-baseline font-bold uppercase leading-none">
                        API
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between">
                  <CodeBlock key={index} code={receipt.code} />

                  {/* <div>
                {receipt.params.map((param: any) => {
                  return (
                    <>
                      <CodeBlock key={index} code={param.definition.value} />

                      {param.definition.children?.length > 0 && (
                        <div>
                          {param.definition.children?.map((child: any) => {
                            return <CodeBlock key={index} code={child.value} />;
                          })}
                        </div>
                      )}
                    </>
                  );
                })}
              </div> */}
                </div>
              </div>
            ))}
          </div>
          <CodeBlock code={consolidatedTypes} />
        </div>
      </div>
    </main>
  );
};

export default ModuleSnippets;
