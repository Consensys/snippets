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

      const path = item.meta.code.link;
      const lineno = item.meta.lineno;

      const parts = path.split("/");
      const index = parts.indexOf("packages");

      // Building a link that points to the line of code in the github repo
      const link = `${process.env.GITHUB_REPO_URL}/${parts
        .slice(index)
        .join("/")}#L${lineno}`;

      return {
        title: title || item.name,
        description: item.declaration && cleanHtml(item.description),
        code: item.meta.code.snippet,
        link,
        api,
        docs,
      };
    });
};
