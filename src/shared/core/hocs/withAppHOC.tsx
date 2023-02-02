import React, { ComponentType } from "react";

export const withAppHOC = (Component: ComponentType): ComponentType => {
  return (): React.ReactElement => <Component />;
};
