import { Iuser } from "./user.login.response";

export interface UserListResponseDto {
  users: Iuser[];
  total: number;
  page: number;
  limit:number;
  totalPages: number;
}
