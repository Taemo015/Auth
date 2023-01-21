import { Router } from "express";
import AuthControllers from "./AuthControllers";
import { Endpoint } from "./types";

const AuthRouter: Router = Router();

AuthRouter.post(Endpoint.registration, AuthControllers.registration);
AuthRouter.post(Endpoint.login, AuthControllers.login);
AuthRouter.get(Endpoint.logout, AuthControllers.logout);

export default AuthRouter;
