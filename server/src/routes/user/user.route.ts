import { Router } from "express";
import { UserService } from "../../services/user/user.service";
import { UserController } from "../../controllers/user/user.controller";

const userRouter = Router();
const userService = new UserService()
const userController = new UserController(userService);

userRouter.post('/get-users',userController.userLogin)

export default userRouter