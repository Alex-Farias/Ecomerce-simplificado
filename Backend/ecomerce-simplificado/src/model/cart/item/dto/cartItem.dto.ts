import { IsBoolean, IsIn, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export class CartItemDTO{
    @IsOptional()
    @IsInt()
    id?: number;
    @IsNotEmpty()
    @IsInt()
    cart: number;
    @IsNotEmpty()
    @IsInt()
    product: number;
    @IsNotEmpty()
    @IsInt()
    productQuantity: number;
    @IsNotEmpty()
    @IsBoolean()
    isSelected: boolean;

    constructor(id: number,
                cart: number,
                product: number,
                productQuantity: number,
                isSelected: boolean)
    {
        this.id = id;
        this.cart = cart;
        this.product = product;
        this.productQuantity = productQuantity;
        this.isSelected = isSelected;
    }

    public getId(): number{return this.id!}
    public getCart(): number{return this.cart!}
    public getProduct(): number{return this.product!}
    public getProductQuantity(): number{return this.productQuantity!}
    public getIsSelected(): boolean{return this.isSelected!}

    public setId(id: number){this.id = id}
    public setCart(cart: number){this.cart = cart}
    public setProduct(prod: number){this.product = prod}
    public setProductQuantity(prodQ: number){this.productQuantity = prodQ}
    public setIsSelected(isSel: boolean){this.isSelected = isSel}
}