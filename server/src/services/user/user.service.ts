import client from "../../config/db.config";
import { UserListRequestDto } from "./dto/user.list.request";
import { UserListResponseDto } from "./dto/user.list.response";
import { UserLoginRequestDTO } from "./dto/user.login.request";
import { Iuser, UserLoginResponseDto } from "./dto/user.login.response";

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

  async userList(dto: UserListRequestDto): Promise<UserListResponseDto> {
    const { page = 1, limit = 10 } = dto;
    const offset = (page - 1) * limit;

    try {
      const userQuery = `
      SELECT *
      FROM users
      WHERE active = true
      ORDER BY username ASC
      LIMIT $1 OFFSET $2
    `;

      const { rows } = await client.query(userQuery, [limit, offset]);

      if (rows.length === 0) {
        throw new Error("no users exist");
      }

      const countQuery = `
      SELECT COUNT(*) AS total
      FROM users
      WHERE active = true
      `;

      const { rows: countRows } = await client.query(countQuery);
      const total = Number(countRows[0].total);

      return {
        users: rows,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  async userDetails(userId: number): Promise<Iuser> {
    try {
      const userQuery = `
      SELECT * from users 
      WHERE users.id = $1
      `;

      const { rows } = await client.query(userQuery, [userId]);

      if (rows.length === 0) {
        throw new Error("No user exists with this ID");
      }
      
      return rows[0] as Iuser;
    } catch (error) {
      throw error;
    }
  }
}
