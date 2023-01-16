import React, { ComponentType } from "react";
import { compose } from "redux";
import Header from "src/core/components/Header";
import Sidebar from "src/core/components/Sidebar";
import { withAppHOC } from "src/core/hocs/withAppHOC";
import routing from "src/router";
import renderRoutes from "src/router/renderRoutes";

import "./App.module.css";

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      {renderRoutes(routing)}
    </div>
  );
};

const withAppData = (Component: ComponentType) =>
  compose<React.FC>(withAppHOC)(Component);

export default withAppData(App);
