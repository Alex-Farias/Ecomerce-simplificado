import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoCategoria } from "src/entity/produto_categoria.entity";
import { Repository } from "typeorm";
import { ProductCategoryDTO } from "./dto/productCategory.dto";
import { ConvertClass } from "src/config/convertClassesEnum";
import { Product } from "../product";
import { ProductDTO } from "../dto/product.dto";
import { ProductCategory } from "./productCategory";

@Injectable()
export class ProductCategoryService{
    constructor(
        @InjectRepository(ProdutoCategoria) private productCategoryRepository: Repository<ProdutoCategoria>
    ){}
    
    async findAll(): Promise<ProductCategoryDTO[]>{
        const categories = await this.productCategoryRepository.find();
        if (!categories || categories.length === 0) {throw new NotFoundException('')}
        return Promise.all(categories.map(cat => this.convert(cat, ConvertClass.DTO)));
    }

    async findById(id: number): Promise<ProductCategoryDTO>{
        const cat = await this.productCategoryRepository.findOne({ where: { idProdutoCategoria: id } });
        if(!cat){throw new NotFoundException('')}
        return this.convert(cat, ConvertClass.DTO);
    }

    async create(catDTO: ProductCategoryDTO): Promise<ProductCategoryDTO> {
        const e = await this.convert(catDTO, ConvertClass.ENTITY);
        if(!e){throw new NotFoundException('')}
        const cCat = await this.productCategoryRepository.save(e);
        return await this.findById(cCat.idProdutoCategoria);
    }

    async update(catDTO: ProductCategoryDTO): Promise<ProductCategoryDTO> {
        const e = await this.convert(catDTO, ConvertClass.ENTITY);
        const uCat = await this.productCategoryRepository.save(e);
        return await this.findById(uCat.idProdutoCategoria);
    }

    async disable(id: number): Promise<ProductCategoryDTO>{
        const catDTO = await this.findById(id);
        if (!catDTO) {throw new NotFoundException('DEU RUIM AQUI?' + catDTO)}
        catDTO.setIsActive(false);

        const e = await this.convert(catDTO, ConvertClass.ENTITY);
        const uCat = await this.productCategoryRepository.save(e);
        return await this.findById(uCat.idProdutoCategoria);
    }
    
    async convert<T>(obj: T, convertTo: ConvertClass): Promise<any> {
        switch (convertTo) {
            case ConvertClass.ENTITY:
                if(obj instanceof ProdutoCategoria) {return obj}
                if(obj instanceof ProductCategory || obj instanceof ProductCategoryDTO){
                    let category = new ProdutoCategoria()
                    category.idProdutoCategoria = obj.getId();
                    category.descricao = obj.getDescription();
                    category.ativo = obj.getIsActive();
                    return category;
                }
                break;
    
            case ConvertClass.CLASS:
                if(obj instanceof ProdutoCategoria){
                    return new ProductCategory(
                        obj.idProdutoCategoria,
                        obj.descricao,
                        obj.ativo
                    );
                }

                if(obj instanceof ProductCategoryDTO) {
                    return new ProductCategory(
                        obj.getId(),
                        obj.getDescription(),
                        obj.getIsActive()
                    )
                }

                if(obj instanceof ProductCategory){
                    return obj;
                }
                break;

            case ConvertClass.DTO:
                if(obj instanceof ProdutoCategoria){
                    return new ProductCategory(
                        obj.idProdutoCategoria,
                        obj.descricao,
                        obj.ativo
                    );
                }

                if(obj instanceof ProductCategory){
                    return new ProductCategoryDTO(
                        obj.getId(),
                        obj.getDescription(),
                        obj.getIsActive()
                    )
                }

                if(obj instanceof ProductCategoryDTO) {
                    return obj;
                }
                
                break;

            default:
                throw new Error('');
        }
        throw new Error('');
    }
}