"use client";

import Link from "next/link";
import CodeBlock from "@/components/code-block";
import { getReceipts } from "@/app/actions/receipts";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const revalidate = 0;

type PageProps = {
  snippet: any;
};

const Snippet = ({ snippet }: PageProps) => {
  return (
    <div className="flex">
      <div className="flex flex-col gap-4 w-full items-center">
        <div className="flex">
          <div>
            <div className="w-full mb-12">
              <div className="text-transparent mb-8 bg-gradient-to-br bg-clip-text  from-white to-slate-400">
                <div>
                  <div className="mt-4 flex items-center  gap-2">
                    <h2 className="text-2xl font-semibold text-transparent mb-2 bg-gradient-to-br bg-clip-text  from-white to-slate-400">
                      {snippet.title}
                    </h2>
                    <div className="flex gap-2">
                      {snippet.docs && (
                        <Link target="_blank" href={snippet.docs}>
                          <div className=" rounded-[10px] text-sm px-2 py-[0.5] bg-green-500 text-white w-fit text-primary-foreground hover:bg-green-500/80">
                            Docs
                          </div>
                        </Link>
                      )}

                      {snippet.api && (
                        <Link target="_blank" href={snippet.api}>
                          <div className=" rounded-[10px] text-sm px-2 py-[0.5] bg-green-500 text-white w-fit text-primary-foreground hover:bg-green-500/80">
                            API
                          </div>
                        </Link>
                      )}

                      <Link target="_blank" href={snippet.path}>
                        <div className=" rounded-[10px] text-sm  px-2 py-[0.5] bg-orange-500 text-white w-fit text-primary-foreground hover:bg-orange-500/80">
                          Repo
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                <p className="text-sm max-w-3xl">{snippet.description}</p>

              </div>
              <div className="flex flex-col lg:flex-row justify-between">
                <CodeBlock code={snippet.code} />

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Snippet;
