import { Router } from "express";
import AuthRouter from "../components/Auth/AuthRoutes";
import UserRoutes from "../components/User/UserRoutes";
import { auth, users } from "./routes";

const router: Router = Router();
router.use(auth, AuthRouter);
router.use(users, UserRoutes);

export default router;
