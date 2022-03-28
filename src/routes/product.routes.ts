import express from 'express';
import { BAD_GATEWAY, CREATED, FAILED_TO_CREATE_PRODUCT, FAILED_TO_DELETE_PRODUCT, FAILED_TO_GET_PRODUCT, FAILED_TO_GET_PRODUCTS, FAILED_TO_UPDATE_LIKE, FAILED_TO_UPDATE_PRODUCT, INTERNAL_SERVER_ERROR, IS_NOT_EXIST_PRODUCT, NOT_CONTENT, OK } from '../constants/result.code';
import { CreateInfoDto } from '../dto/create.info.dto';
import { CreateProductDto } from '../dto/create.product.dto';
import { DeleteProductDto } from '../dto/delete.product.dto';
import { GetProductDto } from '../dto/get.product.dto';
import { ResponseDto } from '../dto/response.dto';
import { UpdateInfoDto } from '../dto/update.info.dto';
import { UpdateLikeDto } from '../dto/update.like.dto';
import { UpdateProductDto } from '../dto/update.product.dto';
import { ProductService } from '../service/product.service';

class ProductController {
    private productService: ProductService

    constructor() {
        this.productService = new ProductService();
    }

    public async createProduct(
        request: express.Request,
        response: express.Response
    ): Promise<express.Response> {
        try {
            const createProductDto: CreateProductDto = JSON.parse(request.body.productInput);
            const createInfoDto: CreateInfoDto = JSON.parse(request.body.infoInput);
            const createImageDto: any = request.files;
            const createProductResponse: ResponseDto = await this.productService.createProduct(
                createProductDto,
                createInfoDto,
                createImageDto    
            );

            if(createProductResponse.code === FAILED_TO_CREATE_PRODUCT) {
                return response.status(BAD_GATEWAY)
                               .json(createProductResponse.message);
            }

            if(createProductResponse.code === INTERNAL_SERVER_ERROR) {
                return response.status(INTERNAL_SERVER_ERROR)
                               .json(createProductResponse.message);
            }

            return response.status(CREATED)
                           .json(createProductResponse.message);
        } catch(e) {
            return response.status(INTERNAL_SERVER_ERROR)
                           .json(e);
        }
    }

    public async getProducts(
        request: express.Request,
        response: express.Response
    ): Promise<express.Response> {
        try {
            const getProductsResponse: ResponseDto = await this.productService.getProducts();

            if(getProductsResponse.code === FAILED_TO_GET_PRODUCTS) {
                return response.status(BAD_GATEWAY)
                               .json(getProductsResponse.message);
            }

            if(getProductsResponse.code === INTERNAL_SERVER_ERROR) {
                return response.status(INTERNAL_SERVER_ERROR)
                               .json(getProductsResponse.message);
            }

            return response.status(OK)
                           .json(getProductsResponse.payload);
        } catch(e) {
            return response.status(INTERNAL_SERVER_ERROR)
                           .json(e);
        }
    }

    public async getProduct(
        request: express.Request,
        response: express.Response
    ): Promise<express.Response> {
        try {
            const getProductDto: GetProductDto = { id: parseInt(request.params.id) }
            const getProductResponse: ResponseDto = await this.productService.getProduct(getProductDto);

            if(
                (getProductResponse.code === FAILED_TO_GET_PRODUCT) ||
                (getProductResponse.code === IS_NOT_EXIST_PRODUCT)
            ) {
                return response.status(BAD_GATEWAY)
                               .json(getProductResponse.message);
            }

            if(getProductResponse.code === INTERNAL_SERVER_ERROR) {
                return response.status(INTERNAL_SERVER_ERROR)
                               .json(getProductResponse.message);
            }

            return response.status(OK)
                           .json(getProductResponse.payload);
        } catch(e) {
            return response.status(INTERNAL_SERVER_ERROR)
                           .json(e);
        }
    }

    public async updateProduct(
        request: express.Request,
        response: express.Response
    ): Promise<express.Response> {
        try {
            const updateProductDto: UpdateProductDto = {
                id: parseInt(request.params.id),
                ...JSON.parse(request.body.productInput)
            };
            const updateInfoDto: UpdateInfoDto = JSON.parse(request.body.infoInput);
            const updateImageDto: any = request.files;
            const updateProductResponse: ResponseDto = await this.productService.updateProduct(
                updateProductDto,
                updateInfoDto,
                updateImageDto    
            );

            if(
                (updateProductResponse.code === FAILED_TO_UPDATE_PRODUCT) ||
                (updateProductResponse.code === IS_NOT_EXIST_PRODUCT)
            ) {
                return response.status(BAD_GATEWAY)
                               .json(updateProductResponse.message);
            }

            if(updateProductResponse.code === INTERNAL_SERVER_ERROR) {
                return response.status(INTERNAL_SERVER_ERROR)
                               .json(updateProductResponse.message);
            }

            return response.status(OK)
                           .json(updateProductResponse.payload);
        } catch(e) {
            return response.status(INTERNAL_SERVER_ERROR)
                           .json(e);
        }
    }

    public async isLikeProduct(
        request: express.Request,
        response: express.Response
    ): Promise<express.Response> {
        try {
            const updateLikeDto: UpdateLikeDto = { 
                id: parseInt(request.params.id),
                userId: request.body.userId,
                isLike: request.body.isLike
            };
            const updateLikeResponseDto: ResponseDto = await this.productService.updateLikeProduct(updateLikeDto);

            if(
                (updateLikeResponseDto.code === FAILED_TO_UPDATE_LIKE) ||
                (updateLikeResponseDto.code === IS_NOT_EXIST_PRODUCT)
            ) {
                return response.status(BAD_GATEWAY)
                               .json(updateLikeResponseDto.message);
            }

            if(updateLikeResponseDto.code === INTERNAL_SERVER_ERROR) {
                return response.status(INTERNAL_SERVER_ERROR)
                               .json(updateLikeResponseDto.message);
            }

            return response.status(OK)
                           .json(updateLikeResponseDto.message);
        } catch(e) {
            return response.status(INTERNAL_SERVER_ERROR)
                           .json(e);
        }
    }

    public async deleteProduct(
        request: express.Request,
        response: express.Response
    ): Promise<express.Response> {
        try {
            const deleteProductDto: DeleteProductDto = { 
                id: parseInt(request.params.id)
            };
            const deleteResponseDto: ResponseDto = await this.productService.deleteProduct(deleteProductDto);

            if(
                (deleteResponseDto.code === FAILED_TO_DELETE_PRODUCT) ||
                (deleteResponseDto.code === IS_NOT_EXIST_PRODUCT)
            ) {
                return response.status(BAD_GATEWAY)
                               .json(deleteResponseDto.message);
            }

            if(deleteResponseDto.code === INTERNAL_SERVER_ERROR) {
                return response.status(INTERNAL_SERVER_ERROR)
                               .json(deleteResponseDto.message);
            }

            return response.status(NOT_CONTENT)
                           .json(deleteResponseDto.message);
        } catch(e) {
            return response.status(INTERNAL_SERVER_ERROR)
                           .json(e);
        }
    }
}

export { ProductController };