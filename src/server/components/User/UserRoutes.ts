import { Router } from "express";
import { Endpoint } from "./types";
import UserController from "./UserController";

const UserRoutes: Router = Router();

UserRoutes.get(Endpoint.users, UserController.getUser);

export default UserRoutes;
