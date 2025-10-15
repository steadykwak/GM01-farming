import type { RouteProps } from "react-router-dom";
import Landing from "@/pages/Landing";
import Ranking from "@/pages/Ranking";
import Status from "@/pages/Status";
import Store from "@/pages/Store";

export const ROUTE_CONFIG_MAIN: RouteProps[] = [
  { index: true, element: <Landing /> },
  { path: "status", element: <Status /> },
  { path: "ranking", element: <Ranking /> },
  { path: "store", element: <Store /> },
  { path: "*", element: <Landing /> },
];

export const ROUTE_PATH = {
  ROOT: "/",
  STATUS: "/status",
  RANKING: "/ranking",
  STORE: "/store",
} as const;
