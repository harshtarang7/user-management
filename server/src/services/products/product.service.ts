import client from "../../config/db.config";
import { UserListRequestDto } from "../user/dto/user.list.request";
import { IProducts, ProductListResponseDto } from "./dto/product.list.request";

export class ProductService {
  constructor() {}

  async getProducts(dto: UserListRequestDto): Promise<ProductListResponseDto> {
    const { page = 1, limit = 10 } = dto;
    const offset = (page - 1) * limit;
    try {
      const productQuery = `
      SELECT *
      FROM products
      WHERE is_deleted = false
      ORDER BY name ASC
      LIMIT $1 OFFSET $2
    `;
      const { rows } = await client.query(productQuery, [limit, offset]);

      if (rows.length === 0) {
        throw new Error("no products exist");
      }

      const countQuery = `
      SELECT COUNT(*) AS total
      FROM products
      WHERE is_deleted = false
      `;

      const { rows: countRows } = await client.query(countQuery);
      const total = Number(countRows[0].total);

      return {
        products: rows,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  async getProductDetail(id: number): Promise<IProducts> {
    try {
      const productQuery = `
      SELECT * from products 
      WHERE products.id = $1
      `;
      const { rows } = await client.query(productQuery, [id]);
      if (rows.length === 0) {
        throw new Error("no product exist with this id");
      }

      const auditQuery = `
            SELECT *
            FROM public.product_audit
            WHERE product_id = $1
            ORDER BY change_date DESC
        `;
      const auditResult = await client.query(auditQuery, [id]);

      return {
        ...rows[0],
        audit: auditResult.rows,
      };
    } catch (error) {
      throw error;
    }
  }
}
