import express, { Router } from 'express';
import { ProductController } from './product.routes';
import { Uploader } from '../utils/uploader';

const uploader: any = new Uploader().uploadFiles();
const router: Router = express.Router();
const productController: ProductController = new ProductController();

router.post(
    "/product", 
    uploader,
    async (
        request: express.Request,
        response: express.Response
    ) => await productController.createProduct(
        request,
        response
    )
);

router.get("/products", async (
    request: express.Request,
    response: express.Response
) => await productController.getProducts(
    request,
    response
));

router.get("/product/:id", async (
    request: express.Request,
    response: express.Response
) => await productController.getProduct(
    request,
    response
));

router.put(
    "/product/:id", 
    uploader,
    async (
        request: express.Request,
        response: express.Response
    ) => await productController.updateProduct(
        request,
        response
    )
);

router.put("/good-product/:id", async (
    request: express.Request,
    response: express.Response
) => await productController.isLikeProduct(
    request,
    response
));

router.delete("/product/:id", async (
    request: express.Request,
    response: express.Response
) => await productController.deleteProduct(
    request,
    response
));

export { router };