import { Request, Response } from "express";
import { UserService } from "../../services/user/user.service";
import { UserLoginRequestDTO } from "../../services/user/dto/user.login.request";
import { UserListRequestDto } from "../../services/user/dto/user.list.request";

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

  usersList = async(req:Request,res:Response)=>{
    try {
      const dto:UserListRequestDto = req.body;
      const users = await this.userService.userList(dto);

      res.status(200).json({
        success:true,
        message:'Users fetched successfully',
        data:users
      })
    } catch (error) {
       res.status(500).json({
        success: false,
        message: `Internal server error: ${error}`,
      });
    }
  }

   userDetail = async(req:Request,res:Response)=>{
    try {
      const {userId} = req.body;

      if(typeof userId !== 'number'){
        return res.status(400).json({
          success:false,
          message:'Invaild request',
          data:{}
        })
      }
      const users = await this.userService.userDetails(userId);

      res.status(200).json({
        success:true,
        message:'User detail fetched successfully',
        data:users
      })
    } catch (error) {
       res.status(500).json({
        success: false,
        message: `Internal server error: ${error}`,
      });
    }
  }
}
