import client from "../../config/db.config";
import { ProductListResponseDto } from "../products/dto/product.list.request";
import { UserListRequestDto } from "../user/dto/user.list.request";
import { OrderListResponseDto } from "./dto/order.list.response";

export class OrderService{
    constructor(){}

    async getOrders(dto: UserListRequestDto): Promise<OrderListResponseDto> {
    const { page = 1, limit = 10 } = dto;
    const offset = (page - 1) * limit;
    try {
      const orderQuery = `
      SELECT *
      FROM orders
      ORDER BY id ASC
      LIMIT $1 OFFSET $2
    `;
      const { rows } = await client.query(orderQuery, [limit, offset]);

      if (rows.length === 0) {
        throw new Error("no orders exist");
      }

      const countQuery = `
      SELECT COUNT(*) AS total
      FROM orders
      `;

      const { rows: countRows } = await client.query(countQuery);
      const total = Number(countRows[0].total);

      return {
        orders: rows,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  }
}