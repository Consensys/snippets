"use server";

import fs from "fs";
import { parse } from "@babel/parser";
import generate from "@babel/generator";
import traverse from "@babel/traverse";
import path from "path";

const typeDocs = fs.readFileSync(process.cwd() + "/doc-gen/out.json", "utf8");

const typeJson = JSON.parse(typeDocs);

export const getAllPackages = async () => {
  const packages: any[] = [];

  typeJson.children.forEach((child: any) => {
    if (child.kind === 2) {
      packages.push({ name: child.name });
    }
  });

  return packages;
};

export const getModules = async (packageName: string) => {
  if (!packageName) {
    return;
  }

  const selectedModule = typeJson.children.find((child: any) => {
    if (child.kind === 2 && child.name === packageName) {
      return child;
    }
  });

  if (!selectedModule) {
    return;
  }

  return selectedModule.children.map((child: any) => {
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
};

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

export const getReceipts = async (packageName: string, moduleName: string) => {
  const functions: any[] = [];
  const types: any[] = [];

  if (!moduleName || !packageName) {
    return;
  }

  const receiptPacakge = typeJson.children.find((child: any) => {
    if (child.name === packageName && child.kind === 2) {
      return child;
    }
  });

  if (!receiptPacakge) {
    console.log(`Package ${packageName} not found`);
    return;
  }

  const receiptModule = receiptPacakge?.children.find((child: any) => {
    if (child.name === `${moduleName}` && child.kind === 2) {
      return child;
    }
  });
  if (!receiptModule) {
    console.log(`Module ${moduleName} not found`);
    return;
  }

  const groups = receiptModule.groups;
  const children = receiptModule.children;

  const typeIds = groups.find(
    (group: any) => group.title === "Type Aliases"
  )?.children;
  const functionIds = groups.find(
    (group: any) => group.title === "Functions"
  )?.children;


  children.forEach((child: any) => {
    if (child.kind === 64) {
      const filePath = path.join(
        process.cwd(),
        `../packages/${packageName}/${child.sources[0].fileName}`
      );

      const code = fs.readFileSync(filePath, "utf8");

      console.log("code", code);

      const ast = parse(code, {
        sourceType: "module",
        plugins: ["typescript", "jsx"],
      });

      traverse(ast, {
        FunctionDeclaration(path) {
          if (path.node.id && path.node.id.name === child.name) {
            delete path.node.leadingComments;
            const fCode = generate(path.node);

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
            });
          }
        },

        enter(path) {
          if (
            path.isTSInterfaceDeclaration() ||
            path.isTSTypeAliasDeclaration() ||
            path.isTSEnumDeclaration() ||
            path.isTSIntersectionType()
          ) {
            const fCode = generate(path.node);

            types.push({
              definition: fCode.code,
            });
          }
        },
      });
    }
  });

  return {
    functions,
    types,
  }
};
