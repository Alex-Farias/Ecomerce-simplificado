import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConvertClass } from "src/config/convertClassesEnum";
import { Produto } from "src/entity/produto.entity";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { ProductCategoryService } from "./category/productCategory.service";
import { ProductDTO } from "./dto/product.dto";
import { Product } from "./product";

@Injectable()
export class ProductService{
    constructor(
        @InjectRepository(Produto)
        private productRepository: Repository<Produto>,
        private productCategoryService: ProductCategoryService,
        private userService: UserService,
    ){}
    
    async findAll(): Promise<ProductDTO[]>{
        const prods = await this.productRepository.find();
        if (!prods || prods.length === 0) {throw new NotFoundException('No users found')}
        return await Promise.all(prods.map(prod => this.convert(prod, ConvertClass.DTO)));
    }

    async findById(id: number): Promise<ProductDTO>{
        const prod = await this.productRepository.findOne({ where: { idProduto: id } });
        if (!prod) {throw new NotFoundException('')}
        return await this.convert(prod, ConvertClass.DTO);
    }

    async create(prodDTO: ProductDTO): Promise<ProductDTO>{
        const e = await this.convert(prodDTO, ConvertClass.ENTITY);
        if(!e){throw new NotFoundException('')}
        const cProd = await this.productRepository.save(e);
        // throw new Error('Aqui?: ' + cProd.idProduto); = 1
        return await this.findById(cProd.idProduto);
    }

    async update(prodDTO: ProductDTO): Promise<ProductDTO>{
        const e = await this.convert(prodDTO, ConvertClass.ENTITY);
        if(!e){throw new NotFoundException('')}
        const uProd = await this.productRepository.save(e);
        return await this.findById(uProd.idProduto);
    }
    
    async disable(id: number): Promise<ProductDTO>{
        const prodDto = await this.findById(id);
        if (!prodDto) {throw new NotFoundException('DEU RUIM AQUI?' + prodDto)}
        prodDto.setIsActive(false);

        const e = await this.convert(prodDto, ConvertClass.ENTITY);
        const uProd = await this.productRepository.save(e);
        return await this.findById(uProd.idProduto);
    }

    async convert<T>(obj: T, convertTo: ConvertClass): Promise<any> {
        switch (convertTo) {
            case ConvertClass.ENTITY:
                if(obj instanceof Produto) {return obj}
                if(obj instanceof Product || obj instanceof ProductDTO){
                    let prod = new Produto();
                    prod.idProduto = obj.getId();
                    prod.produtoCategoria = obj.getCategory();
                    prod.usuario = obj.getUser();
                    prod.titulo = obj.getTitle();
                    prod.descricao = obj.getDescription();
                    prod.unidade = obj.getUnity();
                    prod.preco = obj.getPrice();
                    prod.ativo = obj.getIsActive();
                    return prod;
                }
                break;
    
            case ConvertClass.CLASS:
                if(obj instanceof Produto){
                    const category = await this.productCategoryService.convert(
                        await this.productCategoryService.findById(obj.produtoCategoria), convertTo);
                    const user = await this.productCategoryService.convert(
                        await this.productCategoryService.findById(obj.usuario), convertTo);

                    return new Product(
                        obj.idProduto,
                        category,
                        user,
                        obj.titulo,
                        obj.descricao,
                        obj.unidade,
                        obj.preco,
                        obj.ativo
                    );
                }

                if(obj instanceof ProductDTO) {
                    return new Product(
                        obj.getId(),
                        obj.getCategory(),
                        obj.getUser(),
                        obj.getTitle(),
                        obj.getDescription(),
                        obj.getUnity(),
                        obj.getPrice(),
                        obj.getIsActive(),
                    )
                }

                if(obj instanceof Product){
                    return obj;
                }
                break;

            case ConvertClass.DTO:
                if(obj instanceof Produto){
                    const category = await this.productCategoryService.convert(
                        await this.productCategoryService.findById(obj.produtoCategoria), convertTo);
                    const user = await this.productCategoryService.convert(
                        await this.productCategoryService.findById(obj.usuario), convertTo);

                    return new ProductDTO(
                        obj.idProduto,
                        category,
                        user,
                        obj.titulo,
                        obj.descricao,
                        obj.unidade,
                        obj.preco,
                        obj.ativo
                    );
                }

                if(obj instanceof Product){
                    return new ProductDTO(
                        obj.getId(),
                        obj.getCategory(),
                        obj.getUser(),
                        obj.getTitle(),
                        obj.getDescription(),
                        obj.getUnity(),
                        obj.getPrice(),
                        obj.getIsActive(),
                    )
                }

                if(obj instanceof ProductDTO) {
                    return obj;
                }

                break;

            default:
                throw new Error('Invalid conversion type');
        }
        throw new Error('Conversion type and input do not match');
    }
}