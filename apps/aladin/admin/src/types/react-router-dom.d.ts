/* eslint-disable @typescript-eslint/no-explicit-any */
import { Location, RelativeRoutingType } from "react-router-dom";
import { Path } from "@admin/App";

declare module "react-router-dom" {
  export type _PathParam<Path extends string> =
    Path extends `${infer L}/${infer R}`
      ? _PathParam<L> | _PathParam<R>
      : Path extends `:${infer Param}`
        ? Param extends `${infer Optional}?`
          ? Optional
          : Param
        : never;

  export type PathParam<Path extends string> = Path extends "*" | "/*"
    ? "*"
    : Path extends `${infer Rest}/*`
      ? "*" | _PathParam<Rest>
      : _PathParam<Path>;

  export declare function useLocation<T = unknown>(): Omit<
    Location,
    "state"
  > & { state: T };

  export declare function generatePath<P extends string>(
    path: P & Path,
    params?: {
      [key in PathParam<P>]: string;
    },
  ): Path;

  export interface AlternativeNavigateProps {
    to: Path;
    replace?: boolean;
    state?: any;
    relative?: RelativeRoutingType;
  }

  declare function Navigate(props: AlternativeNavigateProps): null;
}
