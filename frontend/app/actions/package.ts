"use server";

import { glob } from "glob";
import { globby } from "globby";
import fs from "fs";
import { parse } from "@babel/parser";
import generate from "@babel/generator";
import traverse from "@babel/traverse";
import path from "path";

export type CheatFlow = Record<string, PackageCheat[]>;

export type PackageCheat = {
  flow: string;
  step: number;
  code: string;
  title: string;
  description: string;
  file: string;
  link: string;
};

export const getAllPackages = async () => {
  const packages = glob.sync("../packages/*");

  return await Promise.all(
    packages.map(async (pkg) => {
      const packageName = pkg.split("/").pop();

      const flows = (await getAllFlows(packageName!)) || [];
      return { name: pkg.split("/").pop(), flows };
    })
  );
};

export const getAllFlows = async (packageName: string) => {
  const packageCheats = await getCheats(packageName);

  const flow = packageCheats.reduce((acc, cheat) => {
    if (!acc[cheat.flow]) {
      acc[cheat.flow] = [];
    }
    acc[cheat.flow].push(cheat);
    return acc;
  }, {} as CheatFlow);

  for (let flowName in flow) {
    flow[flowName].sort((a, b) => Number(a.step) - Number(b.step));
}
  return flow;
};

export const getCheats = async (packageName: string) => {
  const files = await globby("**/*.+(js|ts|tsx)", {
    cwd: `../packages/${packageName}`,
    gitignore: true,
  });

  const packageCheats: PackageCheat[] = [];

  files.forEach((file) => {
    const absolutePath = path.resolve(`../packages/${packageName}`, file);
    const code = fs.readFileSync(absolutePath, "utf8");

    const ast = parse(code, {
      sourceType: "module",
      plugins: ["typescript", "jsx"],
    });

    traverse(ast, {
      enter(path) {
        const { leadingComments, trailingComments } = path.node;
      
        if (leadingComments) {
          const fetchComment = leadingComments.find((comment) =>
            comment.value.trim().startsWith("@cheatsheet")
          );

       
          if (fetchComment) {
            const jsonStr = fetchComment.value.trim().substring("@cheatsheet".length).trim();
            let cheat: Omit<PackageCheat, "code">;
            try {
              cheat = JSON.parse(jsonStr);
            } catch (err) {
              console.error("Failed to parse JSON n @cheatsheet comment:", err);
              return;
            }
            path.node.leadingComments = path.node.leadingComments?.filter(
              (comment) => comment !== fetchComment
            );
            if (trailingComments) {
              path.node.trailingComments = path.node.trailingComments?.filter(
                (comment) => comment !== fetchComment
              );
            }
            console.log(`https://github.com/chin-flags/metamask-cheatsheet/blob/25ef251683b9896b05353370dad0cbd98972ffd0/packages/${packageName}/${file}#L${path.node.loc?.start.line}-L${path.node.loc?.end.line}}`)
            const { code } = generate(path.node);
            packageCheats.push({
              ...cheat,
              code,
              file: absolutePath,
              link: `https://github.com/chin-flags/metamask-cheatsheet/blob/25ef251683b9896b05353370dad0cbd98972ffd0/packages/${packageName}/${file}#L${path.node.loc?.start.line}-L${path.node.loc?.end.line}}`
            });
          }
        }
      },
    });
  });

  return packageCheats;
};
