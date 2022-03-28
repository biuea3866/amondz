interface CreateProductDto {
    name: string,
    originPrice: number,
    earnablePointPercent: number,
    option: string,
    content: string,
    brand: string,
    isTodayDelivery: boolean
};

export { CreateProductDto };