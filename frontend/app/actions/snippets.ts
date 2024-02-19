"use server";

import fs from "fs";
import path from "path";

const documentationPath = path.join(process.cwd(), "docs/documentation.json");
const jsdocs = fs.readFileSync(documentationPath, "utf8");

const data: any[] = JSON.parse(jsdocs);

const cleanHtml = (html: string) => {
  return html.replace(/<[^>]*>?/gm, "");
};

export const getPackages = async () => {
  const packages = data
    .filter((child: any) => child.kind === "module")
    .reduce((acc: any, moduleObj: any) => {
      const title = moduleObj.tags.find(
        (tag: any) => tag.title === "title"
      )?.value;

      const parts = moduleObj.name.split("/");

      const packageName = parts[0];
      const module = parts.slice(1).join("/");

      const moduleData = {
        title,
        key: module,
        description: cleanHtml(moduleObj.description),
      };

      if (!acc[packageName]) {
        acc[packageName] = [moduleData];
      } else {
        acc[packageName].push(moduleData);
      }

      return acc;
    }, {});

  return packages;
};

export const getSnippetsByModule = async (
  packgeName: string,
  moduleName: string
) => {

  return data
    .filter(
      (item) =>
        item.memberof ===
          `module:${packgeName}/${decodeURIComponent(moduleName)}` &&
        item.kind === "function"
    )
    .map((item: any) => {
      const title = item.tags?.find((tag: any) => tag.title === "title")?.value;
      const description = item.tags?.find((tag: any) => tag.title === "description")
      const api = item.tags?.find((tag: any) => tag.title === "api")?.value;
      const docs = item.tags?.find((tag: any) => tag.title === "docs")?.value;

      const codePath = item.meta.code.link;
      const lineno = item.meta.lineno;

      const parts = codePath.split("/");
      const index = parts.indexOf("packages");

      // Building a link that points to the line of code in the github repo
      const link = `${process.env.GITHUB_REPO_URL}/${codePath
        .split("/")
        .slice(index)
        .join("/")}#L${lineno}`;

      const pkgPath = item.meta.path;

      // Building a link that points to the type definitions in the github repo
      const typeDefs = `${process.env.GITHUB_REPO_URL}/${pkgPath
        .split("/")
        .slice(parts.indexOf("packages"))
        .join("/")}/types/${moduleName}`;

      return {
        title: title || item.name,
        description: item.description && cleanHtml(item.description),
        code: item.meta.code.snippet,
        link,
        typeDefs,
        api,
        docs,
      };
    });
};
