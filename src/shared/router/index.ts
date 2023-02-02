import loadable from "loadable-components";
import * as routes from "shared/constants/route";

export default [
  {
    ...routes.homePage,
    component: loadable(() => import("shared/features/Home")),
  },
  {
    ...routes.RegistrationPage,
    component: loadable(() => import("shared/features/Registration")),
  },
  {
    ...routes.LoginPage,
    component: loadable(() => import("shared/features/Login")),
  },
  {
    ...routes.accountPage,
    component: loadable(() => import("shared/features/Account")),
  },
];
