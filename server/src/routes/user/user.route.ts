import { Router } from "express";
import { UserService } from "../../services/user/user.service";
import { UserController } from "../../controllers/user/user.controller";

const userRouter = Router();
const userService = new UserService()
const userController = new UserController(userService);

userRouter.post('/login',userController.userLogin)
userRouter.post('/get-users-list',userController.usersList)
userRouter.post('/get-user-detail',userController.userDetail)

export default userRouter