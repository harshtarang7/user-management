import client from "../../config/db.config";
import { UserLoginRequestDTO } from "./dto/user.login.request";
import { UserLoginResponseDto } from "./dto/user.login.response";

export class UserService {
  constructor() {}

  async userLogin(dto: UserLoginRequestDTO): Promise<UserLoginResponseDto> {
    try {
      const existingUser = `
            SELECT *
            FROM public.users
            WHERE email = $1
              AND is_deleted = false
              AND active = true
            LIMIT 1
        `;

      const { rows } = await client.query(existingUser, [dto.email]);

      if (rows.length === 0) {
        throw new Error("no user exist with this email");
      }

      const user = rows[0];
      const otp = Math.floor(100000 + Math.random() * 900000);
      // const result = await client.query(existingUser)
      // user login ke liye 1 req, or otp random number send if email sahi ho to
      return {
        user,
        otp,
      };
    } catch (error) {
      throw error;
    }
  }
}
