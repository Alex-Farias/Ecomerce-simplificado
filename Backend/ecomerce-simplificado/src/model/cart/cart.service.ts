import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConvertClass } from "src/config/convertClassesEnum";
import { Carrinho } from "src/entity/carrinho.entity";
import { Repository } from "typeorm";
import { Cart } from "./cart";
import { CartDTO } from "./dto/cart.dto";
import { CartItemService } from "./item/cartItem.service";

@Injectable()
export class CartService{
    constructor(
        @InjectRepository(Carrinho) 
        private cartRepository: Repository<Carrinho>,
        private cartItemService: CartItemService
    ){}

    async findAll(): Promise<CartDTO[]>{
        const carts = await this.cartRepository.find({ relations: ['usuario'] });
        if (!carts || carts.length === 0) {throw new NotFoundException('')}
        return Promise.all(carts.map(cart => this.convert(cart, ConvertClass.DTO)));
    }

    async findById(id: number): Promise<CartDTO>{
        const cart = await this.cartRepository.findOne({ where: { idCarrinho: id }, relations: ['usuario'] });
        if (!cart) {throw new NotFoundException('')}
        return this.convert(cart, ConvertClass.DTO);
    }

    async create(userDTO: CartDTO): Promise<CartDTO>{
        const e = await this.convert(userDTO, ConvertClass.ENTITY);
        if(!e){throw new NotFoundException('')}
        const cCart = await this.cartRepository.save(e);
        return await this.findById(cCart.idUsuario);
    }

    async update(userDTO: CartDTO): Promise<CartDTO>{
        const e = await this.convert(userDTO, ConvertClass.ENTITY);
        if(!e){throw new NotFoundException('')}
        const uCart = await this.cartRepository.save(e);
        return await this.findById(uCart.idUsuario);
    }

    async disable(id: number): Promise<boolean>{
        console.log('service: ' + id);
        const dCart = await this.cartRepository.delete(id);
        if(!dCart){throw new HttpException('Product not found', HttpStatus.NOT_FOUND)}
        return true;
    }

    async convert<T>(obj: T, convertTo: ConvertClass): Promise<any> {
        switch (convertTo) {
            case ConvertClass.ENTITY:
                if(obj instanceof Carrinho) {return obj}
                if(obj instanceof Cart || obj instanceof CartDTO){
                    let cart = new Carrinho()
                    cart.idCarrinho = obj.getId();
                    cart.usuario = obj.getUser();
                    return cart;
                }
                break;
    
            case ConvertClass.CLASS:
                if(obj instanceof Carrinho){
                    return new Cart(
                        obj.idCarrinho,
                        obj.usuario
                    );
                }

                if(obj instanceof CartDTO) {
                    return new Cart(
                        obj.getId(),
                        obj.getUser()
                    )
                }

                if(obj instanceof Cart){
                    return obj;
                }
                break;

            case ConvertClass.DTO:
                if(obj instanceof Carrinho){
                    return new Cart(
                        obj.idCarrinho,
                        obj.usuario
                    );
                }

                if(obj instanceof Cart){
                    return new CartDTO(
                        obj.getId(),
                        obj.getUser()
                    )
                }

                if(obj instanceof CartDTO) {
                    return obj;
                }
                
                break;

            default:
                throw new Error('');
        }
        throw new Error('');
    }
}