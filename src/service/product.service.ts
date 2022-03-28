import { Repository } from 'typeorm';
import { DATABASE_ERROR, FAILED_TO_CREATE_PRODUCT, FAILED_TO_DELETE_PRODUCT, FAILED_TO_GET_PRODUCT, FAILED_TO_GET_PRODUCTS, FAILED_TO_UPDATE_LIKE, FAILED_TO_UPDATE_PRODUCT, INTERNAL_SERVER_ERROR, IS_EXIST_PRODUCT, IS_NOT_EXIST_PRODUCT, SUCCESSED_TO_CREATE_PRODUCT, SUCCESSED_TO_DELETE_PRODUCT, SUCCESSED_TO_GET_PRODUCT, SUCCESSED_TO_GET_PRODUCTS, SUCCESSED_TO_UPDATE_LIKE, SUCCESSED_TO_UPDATE_PRODUCT } from '../constants/result.code';
import { CreateInfoDto } from '../dto/create.info.dto';
import { CreateProductDto } from '../dto/create.product.dto';
import { GetProductDto } from '../dto/get.product.dto';
import { ResponseDto } from '../dto/response.dto';
import { UpdateInfoDto } from '../dto/update.info.dto';
import { UpdateProductDto } from '../dto/update.product.dto';
import { Image } from '../models/image';
import { Info } from '../models/info';
import { Like } from '../models/like';
import { mysql } from '../models/mysql.connection';
import { Product } from '../models/product';
import fs from 'fs';
import path from 'path';
import { UPLOAD_PATH } from '../config/env.variable';
import { UpdateLikeDto } from '../dto/update.like.dto';
import { DeleteProductDto } from '../dto/delete.product.dto';

class ProductService {
    private productRepository: Repository<Product>;
    private imageRepository: Repository<Image>;
    private likeRepsitory: Repository<Like>;

    constructor() {
        this.productRepository = mysql.getRepository(Product);
        this.imageRepository = mysql.getRepository(Image);
        this.likeRepsitory = mysql.getRepository(Like);
    }

    public async isExistProduct(id: number): Promise<ResponseDto> {
        try {
            const isExist: ResponseDto = await this.productRepository.count({ where: { id }})
                                                                     .then(response => {
                                                                         if(response === 1) {
                                                                            return {
                                                                                code: IS_EXIST_PRODUCT,
                                                                                message: "존재하는 상품입니다!",
                                                                                payload: null
                                                                            };
                                                                         }
                                                                         return {
                                                                             code: IS_NOT_EXIST_PRODUCT,
                                                                             message: "존재하지 않는 상품입니다!",
                                                                             payload: null
                                                                         }
                                                                     });

            return isExist;
        } catch(e) {
            return {
                code: INTERNAL_SERVER_ERROR,
                message: e,
                payload: null
            };
        }
    }

    public async createProduct(
        createProductDto: CreateProductDto,
        createInfoDto: CreateInfoDto,
        createImageDto: any    
    ): Promise<ResponseDto> {
        const {
            name,
            originPrice,
            earnablePointPercent,
            option,
            content,
            brand,
            isTodayDelivery,
        } = createProductDto;
        const {
            category,
            base,
            etc,
            plated,
            stone,
            colorOrPattern,
            size,
            shape,
            weight
        } = createInfoDto;

        try {
            const productInfoEntity: Info = new Info().setCategory(category)
                                                      .setBase(base)
                                                      .setEtc(etc)
                                                      .setPlated(plated)
                                                      .setStone(stone)
                                                      .setColorOrPattern(colorOrPattern)
                                                      .setSize(size)
                                                      .setShape(shape)
                                                      .setWeight(weight);

            const productImageEntity: Image[] = createImageDto.map(image => {
                if(image === null) {
                    return null;
                }

                const {
                    originalname,
                    destination,
                    filename,
                    path,
                    size
                } = image;
                const entity: Image = new Image().setOriginName(originalname)
                                                 .setDestination(destination)
                                                 .setFilename(filename)
                                                 .setPath(path)
                                                 .setSize(size);
                
                return entity;
            });

            const productEntity: Product = new Product().setName(name)
                                                        .setOriginPrice(originPrice)
                                                        .setEarnablePointPercent(earnablePointPercent)
                                                        .setOption(option)
                                                        .setContent(content)
                                                        .setBrand(brand)
                                                        .setIsTodayDelivery(isTodayDelivery)
                                                        .setCreatedAt(new Date())
                                                        .setInfo(productInfoEntity)
                                                        .setImage(productImageEntity);

            const response: ResponseDto = await this.productRepository.manager.save(productEntity)
                                                                              .then(response => {
                                                                                  return {
                                                                                      code: SUCCESSED_TO_CREATE_PRODUCT,
                                                                                      message: "상품 등록에 성공하셨습니다!",
                                                                                      payload: response
                                                                                  };
                                                                              })
                                                                              .catch(error => { 
                                                                                  return {
                                                                                      code: FAILED_TO_CREATE_PRODUCT,
                                                                                      message: error,
                                                                                      payload: null
                                                                                  };
                                                                              });

            return response;
        } catch(e) {
            return {
                code: INTERNAL_SERVER_ERROR,
                message: e,
                payload: null
            };
        }
    }

    public async getProducts(): Promise<ResponseDto> {
        try {
            const productResponse: ResponseDto = await this.productRepository.find({
                                                                                 relations: ['info', 'likes', 'images']
                                                                             })
                                                                             .then(response => {
                                                                                 return {
                                                                                     code: SUCCESSED_TO_GET_PRODUCTS,
                                                                                     message: "상품들을 조회했습니다!",
                                                                                     payload: response
                                                                                 }; 
                                                                             })
                                                                             .catch(error => {
                                                                                 return {
                                                                                     code: FAILED_TO_GET_PRODUCTS,
                                                                                     message: error,
                                                                                     payload: null
                                                                                 };
                                                                             });

            return productResponse;
        } catch(e) {
            return {
                code: INTERNAL_SERVER_ERROR,
                message: e,
                payload: null
            };
        }
    }

    public async getProduct(getProductDto: GetProductDto): Promise<ResponseDto> {
        try {
            const id: number = getProductDto.id;
            const isExistProduct: ResponseDto = await this.isExistProduct(id);

            if(isExistProduct.code === IS_NOT_EXIST_PRODUCT) {
                return isExistProduct;
            }
            
            const response: ResponseDto = await this.productRepository.findOne({
                                                                          relations: ['info', 'likes', 'images'],
                                                                          where: { id }
                                                                      })
                                                                      .then(response => {
                                                                          return {
                                                                              code: SUCCESSED_TO_GET_PRODUCT,
                                                                              message: "상품을 조회했습니다!",
                                                                              payload: response
                                                                          };
                                                                      })
                                                                      .catch(error => {
                                                                          return {
                                                                              code: FAILED_TO_GET_PRODUCT,
                                                                              message: error,
                                                                              payload: null
                                                                          };
                                                                      });
                                                        
            return response;
        } catch(e) {
            return {
                code: INTERNAL_SERVER_ERROR,
                message: e,
                payload: null
            };
        }
    }

    public async updateProduct(
        updateProductDto: UpdateProductDto,
        updateInfoDto: UpdateInfoDto,
        updateImageDto: any   
    ) {
        const {
            id,
            name,
            originPrice,
            earnablePointPercent,
            option,
            content,
            brand,
            isTodayDelivery,
        } = updateProductDto;
        const {
            category,
            base,
            etc,
            plated,
            stone,
            colorOrPattern,
            size,
            shape,
            weight
        } = updateInfoDto;

        try {
            const isExistProduct: ResponseDto = await this.isExistProduct(id);

            if(isExistProduct.code === IS_NOT_EXIST_PRODUCT) {
                updateImageDto.map(image => {
                    fs.unlink(path.join(`${__dirname}/../../${UPLOAD_PATH}/${image.filename}`), result => {
                        if(!result) {
                            return;
                        }

                        if(result.code === "ENOENT") {
                            console.log(`${image.filename} 이미지 삭제 오류!`);
                        }
                    });
                });
                
                return isExistProduct;
            }

            const productResponse: ResponseDto = await this.productRepository.findOne({
                                                                                 where: { id },
                                                                                 relations: ['info', 'images']
                                                                             })
                                                                             .then(response => {
                                                                                 return {
                                                                                     code: SUCCESSED_TO_GET_PRODUCT,
                                                                                     message: "상품을 조회했습니다!",
                                                                                     payload: response
                                                                                 };
                                                                             })
                                                                             .catch(error => {
                                                                                 return {
                                                                                     code: FAILED_TO_GET_PRODUCT,
                                                                                     message: error,
                                                                                     payload: null
                                                                                 };
                                                                             });            

            if(productResponse.code === DATABASE_ERROR) {
                return productResponse;
            }

            const productInfoEntity: Info = productResponse.payload.info.setCategory(category)
                                                                        .setBase(base)
                                                                        .setEtc(etc)
                                                                        .setPlated(plated)
                                                                        .setStone(stone)
                                                                        .setColorOrPattern(colorOrPattern)
                                                                        .setSize(size)
                                                                        .setShape(shape)
                                                                        .setWeight(weight);

            productResponse.payload.images.map(async image => {
                const imageEntity: Image = await this.imageRepository.findOne({ where: { filename: image.filename }});

                await this.imageRepository.remove(imageEntity);

                fs.unlink(path.join(`${__dirname}/../../${UPLOAD_PATH}/${image.filename}`), result => {
                    if(!result) {
                        return;
                    }

                    if(result.code === "ENOENT") {
                        console.log(`${image.filename} 이미지 삭제 오류!`);
                    }
                });
            });

            const productImageEntities: Image[] = updateImageDto.map(image => {
                const {
                    originalname,
                    destination,
                    filename,
                    path,
                    size
                } = image;
                const entity: Image = new Image().setOriginName(originalname)
                                                 .setDestination(destination)
                                                 .setFilename(filename)
                                                 .setPath(path)
                                                 .setSize(size);
                
                return entity;
            });

            const productEntity: Product = productResponse.payload.setName(name)
                                                                  .setOriginPrice(originPrice)
                                                                  .setEarnablePointPercent(earnablePointPercent)
                                                                  .setOption(option)
                                                                  .setContent(content)
                                                                  .setBrand(brand)
                                                                  .setIsTodayDelivery(isTodayDelivery)
                                                                  .setInfo(productInfoEntity)
                                                                  .setImage(productImageEntities);

            const productUpdateResponse: ResponseDto = await this.productRepository.save(productEntity)
                                                                                   .then(response => {
                                                                                       return {
                                                                                           code: SUCCESSED_TO_UPDATE_PRODUCT,
                                                                                           message: "상품을 수정했습니다!",
                                                                                           payload: response
                                                                                       };
                                                                                   })
                                                                                   .catch(error => {
                                                                                       return {
                                                                                           code: FAILED_TO_UPDATE_PRODUCT,
                                                                                           message: error,
                                                                                           payload: null
                                                                                       };
                                                                                   });
                                                                      
            return productUpdateResponse;
        } catch(e) {
            return {
                code: INTERNAL_SERVER_ERROR,
                message: e,
                payload: null
            };
        }
    }

    public async updateLikeProduct(updateLikeDto: UpdateLikeDto) {
        const {
            id,
            userId,
            isLike
        } = updateLikeDto;

        try {
            const isExistProduct: ResponseDto = await this.isExistProduct(id);

            if(isExistProduct.code === IS_NOT_EXIST_PRODUCT) {
                return isExistProduct;
            }
            
            const productResponse: ResponseDto = await this.productRepository.findOne({ 
                                                                                 where: { id },
                                                                                 relations: ['likes']
                                                                             })
                                                                             .then(response => {
                                                                                 return {
                                                                                     code: SUCCESSED_TO_GET_PRODUCT,
                                                                                     message: "상품을 조회했습니다!",
                                                                                     payload: response
                                                                                 };
                                                                             })
                                                                             .catch(error => {
                                                                                 return {
                                                                                     code: FAILED_TO_GET_PRODUCT,
                                                                                     message: error,
                                                                                     payload: null
                                                                                 };
                                                                             });

            if(productResponse.code === FAILED_TO_GET_PRODUCT) {
                return {
                    code: FAILED_TO_UPDATE_PRODUCT,
                    message: productResponse.message,
                    payload: null
                };
            }

            const likeEntity: Like[] = productResponse.payload.likes.filter(like => {
                return like.user_id === userId;
            });

            if(!likeEntity[0]) {
                likeEntity[0] = new Like().setUserId(userId)
                                          .setIsLike(isLike)
                                          .setProductId(productResponse.payload.id);
            } else {
                likeEntity[0].setUserId(userId)
                             .setIsLike(isLike);
            }

            const likeResponse: ResponseDto  = await this.likeRepsitory.createQueryBuilder().insert()
                                                                                            .into(Like, ['id', 'user_id', 'is_like', 'product_id'])
                                                                                            .values(likeEntity[0])
                                                                                            .orUpdate(['is_like'], ['id'])
                                                                                            .execute()
                                                                                            .then(response => {
                                                                                                return {
                                                                                                    code: SUCCESSED_TO_UPDATE_LIKE,
                                                                                                    message: "좋아요 업데이트 성공!",
                                                                                                    payload: response
                                                                                                };
                                                                                            })
                                                                                            .catch(error => {
                                                                                                return {
                                                                                                    code: FAILED_TO_UPDATE_LIKE,
                                                                                                    message: error,
                                                                                                    payload: null
                                                                                                };
                                                                                            });
                                                                                 
            return likeResponse;
        } catch(e) {
            return {
                code: INTERNAL_SERVER_ERROR,
                message: e,
                payload: null
            };
        }
    }

    public async deleteProduct(deleteProductDto: DeleteProductDto): Promise<ResponseDto> {
        try {
            const isExistProduct: ResponseDto = await this.isExistProduct(deleteProductDto.id);

            if(isExistProduct.code === IS_NOT_EXIST_PRODUCT) {
                return isExistProduct;
            }

            const productEntity: Product = await this.productRepository.findOne({ 
                where: { 
                    id: deleteProductDto.id 
                },
                relations: ['info', 'images', 'likes']
            });
            const deleteProductResponse: ResponseDto = await this.productRepository.remove(productEntity)
                                                                                   .then(response => {
                                                                                       return {
                                                                                           code: SUCCESSED_TO_DELETE_PRODUCT,
                                                                                           message: `성공적으로 ${response.name} 상품을 삭제했습니다!`,
                                                                                           payload: null
                                                                                       };
                                                                                   })
                                                                                   .catch(error => {
                                                                                       return {
                                                                                           code: FAILED_TO_DELETE_PRODUCT,
                                                                                           message: error,
                                                                                           payload: null
                                                                                       };
                                                                                   });
            
            if(
                deleteProductResponse.code === SUCCESSED_TO_DELETE_PRODUCT &&
                productEntity.images.length >= 1
            ) {

                productEntity.images.map(async image => {
                    const imageEntity: Image = await this.imageRepository.findOne({ where: { filename: image.filename }});
    
                    await this.imageRepository.remove(imageEntity);
    
                    fs.unlink(path.join(`${__dirname}/../../${UPLOAD_PATH}/${image.filename}`), result => {
                        if(!result) {
                            return;
                        }
    
                        if(result.code === "ENOENT") {
                            console.log(`${image.filename} 이미지 삭제 오류!`);
                        }
                    });
                });
            }

            return deleteProductResponse;
        } catch(e) {
            return {
                code: INTERNAL_SERVER_ERROR,
                message: e,
                payload: null
            };
        }
    }
}

export { ProductService };