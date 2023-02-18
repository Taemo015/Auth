import React from "react";
import { Routes, Route as RouteComponent } from "react-router-dom";
import routing from "./index";

export default function renderRouter(routes: typeof routing) {
  return (
    <Routes>
      {routes.map((route, key) => {
        const routeProps = {
          path: route.path,
          exact: true,
          element: <route.component />,
        };

        return <RouteComponent key={key} {...routeProps} />;
      })}
    </Routes>
  );
}
