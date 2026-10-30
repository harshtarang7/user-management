import { Router } from "express";
import { UserService } from "../../services/user/user.service";
import { UserController } from "../../controllers/user/user.controller";
import { ProductService } from "../../services/products/product.service";
import { ProductController } from "../../controllers/products/product.controller";

const productRouter = Router();
const productService = new ProductService()
const productController = new ProductController(productService);

productRouter.post('/get-products',productController.getProducts)
// productRouter.post('/get-users-list',productController.usersList)
// productRouter.post('/get-user-detail',productController.userDetail)

export default productRouter