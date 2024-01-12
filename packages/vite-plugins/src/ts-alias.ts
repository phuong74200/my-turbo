import { getTsconfig } from "get-tsconfig";
import path from "path";
import { Plugin } from "vite";

import { toArray } from "./utils";

type Config = {
  root?: string;
  transform?: (
    find: string,
    replacement: string[],
  ) => {
    find: string;
    replacement: string;
  };
};

export function vitePluginTypesriptAlias(config?: Config): Plugin {
  const { root } = {
    root: "./",
    ...config,
  };

  const tsconfig = getTsconfig();
  const paths = tsconfig?.config.compilerOptions?.paths || {};

  const data = Object.entries(paths).map(([find, replacement]) => {
    const transformed = config?.transform?.(find, replacement) || {
      find: find.replace("/*", ""),
      replacement: path.resolve(root, replacement[0]?.replace("/*", "")),
    };

    return transformed;
  });

  return {
    name: "configure-server",
    enforce: "pre",
    config(config) {
      config.resolve = {
        ...config.resolve,
        alias: config.resolve?.alias
          ? [...toArray(config.resolve.alias as any), ...data]
          : data,
      };
    },
  };
}
