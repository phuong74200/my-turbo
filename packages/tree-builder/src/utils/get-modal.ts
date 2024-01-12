import { TreeBuilder } from "@tree-builder/index";
import { RouteObjectWithFixedPath } from "@tree-builder/types";

const getModal = (routes: RouteObjectWithFixedPath[], tree: TreeBuilder) => {
  routes.forEach((route) => {
    if (route.modal) {
      const routeFrame = tree.push(route.path);

      Object.assign(routeFrame, route);
    }

    if (route.children) {
      getModal(route.children, tree);
    }
  });

  return tree.nested;
};

export default getModal;
