import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CarrinhoItem } from "src/entity/carrinhoItem.entity";
import { Repository } from "typeorm";
import { CartItemDTO } from "./dto/cartItem.dto";
import { ConvertClass } from "src/config/convertClassesEnum";
import { CartItem } from "./cartItem";

@Injectable()
export class CartItemService{
    constructor(
        @InjectRepository(CarrinhoItem) private cartItemRepository: Repository<CarrinhoItem>
    ){}
    
    async findAll(): Promise<CartItemDTO[]>{
        const items = await this.cartItemRepository.find({ relations: ['carrinho', 'produto'] });
        if (!items || items.length === 0) {throw new NotFoundException('')}
        return Promise.all(items.map(item => this.convert(item, ConvertClass.DTO)));
    }

    async findById(id: number): Promise<CartItemDTO>{
        const item = await this.cartItemRepository.findOne({ where: { idCarrinhoItem: id }, relations: ['carrinho', 'produto'] });
        if(!item){throw new NotFoundException('')}
        return this.convert(item, ConvertClass.DTO);
    }

    async create(itemDTO: CartItemDTO): Promise<CartItemDTO> {
        const e = await this.convert(itemDTO, ConvertClass.ENTITY);
        if(!e){throw new NotFoundException('')}
        const cItem = await this.cartItemRepository.save(e);
        return await this.findById(cItem.idCarrinhoItem);
    }

    async update(itemDTO: CartItemDTO): Promise<CartItemDTO> {
        const e = await this.convert(itemDTO, ConvertClass.ENTITY);
        const uItem = await this.cartItemRepository.save(e);
        return await this.findById(uItem.idCarrinhoItem);
    }

    async disable(id: number): Promise<boolean>{
        const dItem = await this.cartItemRepository.delete(id);
        if (!dItem) {throw new HttpException('Item not found', HttpStatus.NOT_FOUND)}
        return true;
    }
    
    async convert<T>(obj: T, convertTo: ConvertClass): Promise<any> {
        switch (convertTo) {
            case ConvertClass.ENTITY:
                if(obj instanceof CarrinhoItem) {return obj}
                if(obj instanceof CartItem || obj instanceof CartItemDTO){
                    let category = new CarrinhoItem()
                    category.idCarrinhoItem = obj.getId();
                    category.carrinho = obj.getCart();
                    category.produto = obj.getProduct();
                    category.produtoQuantidade = obj.getProductQuantity();
                    category.selecionado = obj.getIsSelected();
                    return category;
                }
                break;
    
            case ConvertClass.CLASS:
                if(obj instanceof CarrinhoItem){
                    return new CartItem(
                        obj.idCarrinhoItem,
                        obj.carrinho,
                        obj.produto,
                        obj.produtoQuantidade,
                        obj.selecionado
                    );
                }

                if(obj instanceof CartItemDTO) {
                    return new CartItem(
                        obj.getId(),
                        obj.getCart(),
                        obj.getProduct(),
                        obj.getProductQuantity(),
                        obj.getIsSelected()
                    )
                }

                if(obj instanceof CartItem){
                    return obj;
                }
                break;

            case ConvertClass.DTO:
                if(obj instanceof CarrinhoItem){
                    return new CartItem(
                        obj.idCarrinhoItem,
                        obj.carrinho,
                        obj.produto,
                        obj.produtoQuantidade,
                        obj.selecionado
                    );
                }

                if(obj instanceof CartItem){
                    return new CartItemDTO(
                        obj.getId(),
                        obj.getCart(),
                        obj.getProduct(),
                        obj.getProductQuantity(),
                        obj.getIsSelected()
                    )
                }

                if(obj instanceof CartItemDTO) {
                    return obj;
                }
                
                break;

            default:
                throw new Error('');
        }
        throw new Error('');
    }
}