import { RouteObjectWithFixedPath } from "@tree-builder/types";

const getPage = (r: RouteObjectWithFixedPath[]) => {
  const routes = r.map((e) => ({ ...e })).filter((e) => !e.modal);

  routes.forEach((route) => {
    if (route.children) route.children = getPage(route.children);
  });

  return routes;
};

export default getPage;
