"use server";

import fs from "fs";
import path from "path";

const documentationPath = path.join(process.cwd(), "docs/documentation.json");
const jsdocs = fs.readFileSync(documentationPath, "utf8");

const data: any[] = JSON.parse(jsdocs);

const cleanHtml = (html: string) => {
  return html.replace(/<[^>]*>?/gm, "");
};

export const getModules = async () => {
  const modules = data
    .filter((child: any) => child.kind === "module")
    .map((moduleObj: any) => {
      const title = moduleObj.tags.find(
        (tag: any) => tag.title === "title"
      )?.value;

      return {
        title,
        key: moduleObj.longname,
        description: cleanHtml(moduleObj.description),
      };
    });
  return modules;
};

export const getSnippetsByModule = async (moduleName: string) => {
  return data
    .filter((item) => item.memberof === moduleName && item.kind === "function")
    .map((item: any) => {
      const title = item.tags?.find((tag: any) => tag.title === "title")?.value;
      const api = item.tags?.find((tag: any) => tag.title === "api")?.value;
      const docs = item.tags?.find((tag: any) => tag.title === "docs")?.value;
      console.log("+++++++++++++++++++++++++ PATH", item.meta.path);
      return {
        title: title || item.name,
        description: item.declaration && cleanHtml(item.description),
        code: item.meta.code.snippet,
        api,
        docs,
        path: item.meta.path,
      };
    });
};
