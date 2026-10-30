import { Request, Response } from "express";
import { ProductService } from "../../services/products/product.service";
import { UserListRequestDto } from "../../services/user/dto/user.list.request";

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  getProducts = async (req: Request, res: Response) => {
    try {
      const dto: UserListRequestDto = req.body;

      const products = await this.productService.getProducts(dto);

      res.status(200).json({
        success: true,
        message: "Products detail fetched successfully",
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Internal server error: ${error}`,
      });
    }
  };
}
