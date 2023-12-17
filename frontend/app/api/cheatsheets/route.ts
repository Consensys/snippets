import { promisify } from "util";
import fs from "fs";
import { parse } from "@babel/parser";
import generate from "@babel/generator";
import traverse from "@babel/traverse";
import { glob } from "glob";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const packageName = searchParams.get("package");

  if (!packageName)
  return NextResponse.rewrite('/error?message=No package name provided');

  const packages = glob.sync(`../packages/${packageName}`);

  let packageCheats: any[] = [];

  packages.forEach((packageDir) => {
    // Use a glob pattern to match all .js or .ts files in the current package
    const files = glob.sync(path.join(packageDir, "src/**/*.+(js|ts|tsx)"));

    let cheats: any = [];

    files.forEach((file) => {
      const code = fs.readFileSync(file, "utf8");
      const ast = parse(code, {
        sourceType: "module",
        plugins: ["typescript", "jsx"],
      });

      let fetchNextBlock = false;
      const blocks: any[] = [];

      traverse(ast, {
        enter(path) {
          const { leadingComments, trailingComments } = path.node;
          if (leadingComments) {
            const fetchComment = leadingComments.find((comment) =>
              comment.value.trim().startsWith("@fetch")
            );
            if (fetchComment) {
              const jsonStr = fetchComment.value.trim().substring(6).trim();
              let properties;
              try {
                properties = JSON.parse(jsonStr);
              } catch (err) {
                console.error("Failed to parse JSON in @fetch comment:", err);
                return;
              }
              path.node.leadingComments = path.node.leadingComments.filter(
                (comment) => comment !== fetchComment
              );
              if (trailingComments) {
                path.node.trailingComments = path.node.trailingComments.filter(
                  (comment) => comment !== fetchComment
                );
              }
              const { code } = generate(path.node);
              blocks.push({ code, properties });
            }
          }
        },
      });

      cheats.push(blocks);

      //   const code = fs.readFileSync(file, "utf8");

      //   const syntax = parse(code, {sourceType: 'module',plugins: ['typescript', 'jsx']});

      //   const comments = syntax?.comments

      //   if(!comments) return

      //   const fileCheats = comments
      //     .filter((comment: any) => comment.value.trim().startsWith("@cheatsheet"))
      //     .map((comment: any) => {
      //       const lines = comment.value.split("\n");
      //       const title = lines[1].trim();
      //       const content = lines.slice(2).join("\n").trim();
      //       return { title, content };
      //     });
    });
    packageCheats.push(cheats);
    // // Add the cheats for the current package to the cheatsPerPackage object
    // cheatsPerPackage[path.basename(packageDir)] = cheats;
  });

  return NextResponse.json(packageCheats);
  // Now cheatsPerPackage contains a separate array of cheats for each package
}
