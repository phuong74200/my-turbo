/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Outlet } from "react-router-dom";
import { ResolvePath, RouteObject } from "@tree-builder/types";
import { uid } from "uid";

/**
 * @description create an empty react-route-dom object
 */
export function createEmptyRoute(path: string = "/"): RouteObject {
  return {
    path: path,
    Component: Outlet,
    children: [],
    id: uid(),
  };
}

/**
 * @description remove trailing and leading slashes. Make sure that all the paths are in the same format
 */
export function stdRelativePath(path: string) {
  return path.replace(/^\/+|\/+$/g, "");
}

/**
 * @description resolve a path to a tree structure
 */
export function resolvePath(path: string): ResolvePath {
  const stdPath = stdRelativePath(path);
  const segments = stdPath.split("/");
  const parent =
    path === "" ? null : resolvePath(segments.slice(0, -1).join("/"));

  return {
    segments,
    parent,
    url: stdPath || "/",
    relative: segments[segments.length - 1],
  };
}
