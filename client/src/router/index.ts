import loadable from "loadable-components";
import * as routes from "src/constants/route";

export default [
  { ...routes.homePage, component: loadable(() => import("src/features/Home")) },
  { ...routes.RegistrationPage, component: loadable(() => import("src/features/Registration")) },
  { ...routes.LoginPage, component: loadable(() => import("src/features/Login")) },
  { ...routes.accountPage, component: loadable(() => import("src/features/Account")) },
];
