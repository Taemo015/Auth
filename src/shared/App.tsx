import React, { ComponentType, useEffect } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import Header from "shared/core/components/Header";
import Sidebar from "shared/core/components/Sidebar";
import { withAppHOC } from "shared/core/hocs/withAppHOC";
import routing from "shared/router";
import renderRoutes from "shared/router/renderRoutes";

import "./App.module.css";
import { actions } from "./features/Auth/ducks";
import AuthService from "./utils/AuthService";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (AuthService.hasToken()) {
      dispatch(actions.fetchAccount());
    }
  }, [dispatch]);

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
