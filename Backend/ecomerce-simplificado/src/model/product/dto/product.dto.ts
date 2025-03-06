import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { User } from "src/model/user/user";
import { ProductCategory } from "../category/productCategory";
import { Type } from "class-transformer";
import { ProductCategoryDTO } from "../category/dto/productCategory.dto";
import { UserDTO } from "src/model/user/dto/user.dto";
import { Product } from "../product";

export class ProductDTO{
    @IsOptional()
    @IsInt()
    id?: number;
    @IsNotEmpty()
    @IsInt()
    category: number;
    @IsNotEmpty()
    @IsInt()
    user: number;
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: any;
    @IsString()
    @IsNotEmpty()
    unity: string;
    @IsNumber()
    @IsNotEmpty()
    price: number;
    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;

    constructor(id: number,
                category: number,
                user: number,
                title: string,
                description: any,
                unity: string,
                price: number,
                isActive: boolean)
    {
        this.id = id;
        this.category = category;
        this.user = user;
        this.title = title;
        this.description = description;
        this.unity = unity;
        this.price = price;
        this.isActive = isActive;
    }
    
    public getId(): number{return this.id!}
    public getCategory(): number{return this.category!}
    public getUser(): number{return this.user!}
    public getTitle(): string{return this.title!}
    public getDescription(): string{return this.description!}
    public getUnity(): string{return this.unity!}
    public getPrice(): number{return this.price!}
    public getIsActive(): boolean{return this.isActive!}

    public setId(id: number){this.id = id}
    public setCategory(category: number){this.category = category}
    public setUser(user: number){this.user = user}
    public setTitle(title: string){this.title = title}
    public setDescription(description: string){this.description = description}
    public setUnity(unity: string){this.unity = unity}
    public setPrice(price: number){this.price = price}
    public setIsActive(isActive: boolean){this.isActive = isActive}
}