import { IsBoolean, IsIn, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class OrderItemDTO{
    @IsOptional()
    @IsInt()
    id: number;
    @IsNotEmpty()
    @IsInt()
    order: number;
    @IsNotEmpty()
    @IsInt()
    product: number;
    @IsNotEmpty()
    @IsInt()
    productQuantity: number;
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    constructor(id: number,
                order: number,
                product: number,
                productQuantity: number,
                isActive: boolean){
        this.id = id;
        this.order = order;
        this.product = product;
        this.productQuantity = productQuantity;
        this.isActive = isActive;
    }

    public getId(): number{return this.id!}
    public getOrder(): number{return this.order!}
    public getProduct(): number{return this.product!}
    public getProductQuantity(): number{return this.productQuantity!}
    public getIsActive(): boolean{return this.isActive!}

    public setId(id: number){this.id = id}
    public setOrder(order: number){this.order = order}
    public setProduct(product: number){this.product = product}
    public setProductQuantity(productQuantity: number){this.productQuantity = productQuantity}
public setIsActive(isActive: boolean){this.isActive = isActive}
}