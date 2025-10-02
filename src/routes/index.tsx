import type { RouteProps } from "react-router-dom";
import Landing from "@/pages/Landing";
import Ranking from "@/pages/Ranking";
import Status from "@/pages/Status";

export const ROUTE_CONFIG_MAIN: RouteProps[] = [
  { index: true, element: <Landing /> },
  { path: "status", element: <Status /> },
  { path: "ranking", element: <Ranking /> },
];

type PathFromRoute<T> = T extends { path: infer P extends string }
  ? P
  : T extends { index: true }
  ? "/"
  : never;

export type ROUTE_PATH = PathFromRoute<(typeof ROUTE_CONFIG_MAIN)[number]>;
