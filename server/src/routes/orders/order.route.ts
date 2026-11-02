import { Router } from "express";
import { OrderService } from "../../services/orders/order.service";
import { OrderController } from "../../controllers/orders/order.controller";

const orderRouter = Router();
const orderService = new OrderService()
const orderController = new OrderController(orderService);

orderRouter.post('/get-orders',orderController.getOrders)
orderRouter.post('/get-order-detail',orderController.getOrderDetail)

export default orderRouter