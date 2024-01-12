import { RouteObjectWithFixedPath } from "@tree-builder/types";

const { fillId } = (() => {
  const count = new Map<string, number>();

  const fillId = (r: RouteObjectWithFixedPath[]) => {
    const routes = r.map((e) => ({ ...e }));

    routes.forEach((route) => {
      count.set(route.path, (count.get(route.path) || 0) + 1);

      route.id = `${route.path}:${count.get(route.path)}`;
      count.set(route.path, count.get(route.path) || 0);

      if (route.children) route.children = fillId(route.children);
    });

    return routes;
  };

  return { fillId };
})();

export default fillId;
