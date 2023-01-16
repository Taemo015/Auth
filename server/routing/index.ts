import { Router } from "express";
import UserController from "../controllers/User/userController";

const router: Router = Router();
router.post("/registration", UserController.registration.bind(UserController));
router.post("/login", UserController.login.bind(UserController));

router.get("/logout", UserController.logout.bind(UserController));
router.get("/refresh", UserController.refresh.bind(UserController));

export default router;
