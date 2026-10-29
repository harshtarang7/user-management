import { Request, Response } from "express";
import { UserService } from "../../services/user/user.service";
import { UserLoginRequestDTO } from "../../services/user/dto/user.login.request";

export class UserController {
  constructor(private readonly userService: UserService) {}

  userLogin = async (req: Request, res: Response) => {
    try {
        const dto:UserLoginRequestDTO = req.body;
      const user = await this.userService.userLogin(dto);

       res.status(200).json({
            success: true,
            message: "OTP generated successfully",
            data: user,
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Login error",
      });
    }
  };
}
