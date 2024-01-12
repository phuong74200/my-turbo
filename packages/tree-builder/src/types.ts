import { NonIndexRouteObject } from "react-router-dom";

export type RouteObject = Omit<
  NonIndexRouteObject,
  "id" | "path" | "children"
> & {
  id: string;
  path: string;
  children: RouteObject[];

  parent?: {
    $ref: RouteObject;
    at: number;
  };

  sibling?: RouteObject;
};

export type ResolvePath = {
  segments: string[];
  parent: ResolvePath | null;
  url: string;
  relative: string;
};

export type RouteObjectWithFixedPath<Path = string> = Omit<
  NonIndexRouteObject,
  "path" | "children"
> & {
  path: Path;
  children?: RouteObjectWithFixedPath[];
  modal?: boolean;
};
