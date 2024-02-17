import { lazy } from "react";
import { Paths } from "../utils/constants";
import { TRoute } from "../types/route";

const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'))

const routes = [
  {
    name: 'Dashboard',
    path: Paths.DASHBOARD,
    Component: Dashboard,
    Fallback: null
  }
] as TRoute[]

export default routes;