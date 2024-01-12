import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

export default createBrowserRouter(
  [
    {
      path: "/",
      Component: lazy(() => import("@/pages")),
    },
    {
      path: "/cardEditor",
      Component: lazy(() => import("@/pages/cardEditor")),
    },
  ],
  {}
);
