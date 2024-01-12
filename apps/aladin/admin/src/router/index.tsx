import { ErrorBoundary } from "react-error-boundary";
import {
  createBrowserRouter,
  NonIndexRouteObject,
  useLocation,
  useRoutes,
} from "react-router-dom";
import { Path } from "@admin/router/path";
import { fillId, getModal, getPage, TreeBuilder } from "@repo/tree-builder";

export type RouteObjectWithFixedPath = Omit<
  NonIndexRouteObject,
  "path" | "children"
> & {
  path: Path;
  children?: RouteObjectWithFixedPath[];
  modal?: boolean;
};

const routes: RouteObjectWithFixedPath[] = [];

const uidRoutes = fillId(routes);
const modalRoutes = getModal(uidRoutes, new TreeBuilder());
const pageRoutes = getPage(uidRoutes);

export const ModalRoute = () => {
  const location = useLocation<{
    background: string;
  }>();

  const background = location.state && location.state.background;

  const modalRoute = useRoutes(modalRoutes);

  const fullPageRoute = useRoutes(pageRoutes, background || location);

  return (
    <ErrorBoundary fallback={<h1>fall-back</h1>}>
      {fullPageRoute}
      {background && modalRoute}
    </ErrorBoundary>
  );
};

export const browserRouter = createBrowserRouter([
  {
    path: "/",
    Component: ModalRoute,
    errorElement: <h1>fall-back</h1>,
    children: uidRoutes,
  },
]);
