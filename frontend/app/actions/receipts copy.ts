"use server";

import fs from "fs";
import { parse } from "@babel/parser";
import generate from "@babel/generator";
import traverse from "@babel/traverse";

const typeDocs = fs.readFileSync(
  process.cwd() + "/typeDoc/output.json",
  "utf8"
);

const typeJson = JSON.parse(typeDocs);

export const getReceiptModules = async () =>
  typeJson.children.map((child: any) => {
    if (child.kind === 2) {
      const title = child.comment?.blockTags?.find(
        (tag: any) => tag.tag === "@title"
      )?.content[0]?.text;

      const description = child.comment?.blockTags?.find(
        (tag: any) => tag.tag === "@description"
      )?.content[0]?.text;

      const docs = child.comment?.blockTags?.find(
        (tag: any) => tag.tag === "@docs"
      )?.content[0]?.target;

      const api = child.comment?.blockTags?.find(
        (tag: any) => tag.tag === "@api"
      )?.content[0]?.target;

      return {
        id: child.id,
        name: child.name,
        title,
        description,
        docs,
        api,
      };
    }
  });

// function getTypeDefinition(data: any, id: string) {
//   const typeDef = data.find((child: any) => child.id === id);
// console.log(typeDef, 'typeDef')
//   const childTypes: any = [];

//   const type = {
//     name: typeDef.name,
//     properties: typeDef.type?.declaration.children.map((child: any) => {
//       let type;
//       if (child.type.type === "reference") {
//         type = child.type.name || "any";
//         childTypes.push(getTypeDefinition(data, child.type.target));
//       } else {
//         type = child.type.name || "any";
//       }

//       return {
//         name: child.name,
//         type,
//         children: childTypes,
//       };
//     }),
//   };

//   let value = `export type ${type.name} = {\n`;
//   type.properties?.forEach((prop: any) => {
//     value += `  ${prop.name}: ${prop.type};\n`;
//   });
//   value += "};";

//   return {
//     value,
//     children: childTypes,
//   };
// }




export const getReceipts = async (moduleName: string) => {
  const functions: any[] = [];

  if (!moduleName) {
    return;
  }

  const reciptModule = typeJson.children.find((child: any) => {
    if (child.kind === 2 && child.name === moduleName) {
      return child;
    }
    console.log(`Module ${module} not found`);
    return;
  });

  reciptModule.children.forEach((child: any) => {
    if (child.kind === 64) {
      const file = process.cwd() + `/app/receipts/${child.sources[0].fileName}`;
      const code = fs.readFileSync(file, "utf8");
      const ast = parse(code, {
        sourceType: "module",
        plugins: ["typescript", "jsx"],
      });

      traverse(ast, {
        FunctionDeclaration(path) {
          if (path.node.id && path.node.id.name === child.name) {
            delete path.node.leadingComments;
            const fCode = generate(path.node);

            const params: any[] = [];

            child.signatures[0].parameters.map((param: any) => {
              // pick only the reference types
              if (param.type.type === "reference") {
                params.push({
                  key: param.name,
                  type: param.type.name,
                  // definition: getTypeDefinition(
                  //   reciptModule.children,
                  //   param.type.target
                  // ),
                });
              }
            });

            const comments = child.signatures[0].comment;

            let title, description, docs, api;

            if (comments) {
              title = comments.blockTags?.find(
                (tag: any) => tag.tag === "@title"
              )?.content[0]?.text;
              description = comments.blockTags?.find(
                (tag: any) => tag.tag === "@description"
              )?.content[0]?.text;
              docs = comments.blockTags?.find((tag: any) => tag.tag === "@docs")
                ?.content[0]?.target;
              api = comments.blockTags?.find((tag: any) => tag.tag === "@api")
                ?.content[0]?.target;
            }

            functions.push({
              code: fCode.code,
              title,
              description,
              docs,
              api,
              params,
            });
          }
        },
      });
    }
  });

  return functions;
};
