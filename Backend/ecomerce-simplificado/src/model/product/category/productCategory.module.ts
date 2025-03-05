import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoCategoria } from "src/entity/produto_categoria.entity";
import { ProductCategoryController } from "./productCategory.controller";
import { ProductCategoryService } from "./productCategory.service";

@Module({
    imports: [TypeOrmModule.forFeature([ProdutoCategoria])],
    providers: [ProductCategoryService],
    controllers: [ProductCategoryController],
    exports: [ProductCategoryService],
})
export class ProductCategoryModule{}