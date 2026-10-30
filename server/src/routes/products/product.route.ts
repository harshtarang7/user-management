import { Router } from "express";
import { ProductService } from "../../services/products/product.service";
import { ProductController } from "../../controllers/products/product.controller";

const productRouter = Router();
const productService = new ProductService()
const productController = new ProductController(productService);

productRouter.post('/get-products',productController.getProducts)
productRouter.post('/get-product-detail',productController.getProductDetail)

export default productRouter