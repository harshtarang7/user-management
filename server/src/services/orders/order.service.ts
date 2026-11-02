import client from "../../config/db.config";
import { UserListRequestDto } from "../user/dto/user.list.request";
import { IOrders, OrderListResponseDto } from "./dto/order.list.response";

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

  async getOrderDetail(id:number):Promise<IOrders>{
    try {
      const existingOrder = `
      SELECT * FROM orders
      WHERE orders.id = $1
      ORDER BY id ASC
      `;

      const {rows} = await client.query(existingOrder,[id]);

      if(rows.length === 0){
        throw new Error('No orders found with this id');
      }

      const orderAudit = `
      SELECT * FROM order_audit
      Where order_id = $1
      `;

       const auditResult = await client.query(orderAudit,[id]);

       return {
        ...rows[0],
        audit:auditResult.rows
       }

    } catch (error) {
      throw error
    }
  }
}