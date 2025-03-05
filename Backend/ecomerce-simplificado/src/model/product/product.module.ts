import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "src/entity/produto.entity";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { ProductCategoryModule } from "./category/productCategory.module";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Produto]),
        ProductCategoryModule,
        UserModule,
    ],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService],
})
export class ProductModule{}