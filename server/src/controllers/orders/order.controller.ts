import { Request, Response } from "express";
import { OrderService } from "../../services/orders/order.service";
import { UserListRequestDto } from "../../services/user/dto/user.list.request";

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  getOrders = async (req: Request, res: Response) => {
    try {
      const dto: UserListRequestDto = req.body;

      const orders = await this.orderService.getOrders(dto);
      res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Internal server error: ${error}`,
      });
    }
  };
}
