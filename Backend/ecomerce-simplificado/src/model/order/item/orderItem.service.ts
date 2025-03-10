import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConvertClass } from "src/config/convertClassesEnum";
import { PedidoItem } from "src/entity/pedido_item.entity";
import { Repository } from "typeorm";
import { OrderItemDTO } from "./dto/orderItem.dto";
import { OrderItem } from "./orderItem";

@Injectable()
export class OrderItemService{
    constructor(@InjectRepository(PedidoItem) private orderItemRepository: Repository<PedidoItem>){}

    async findAll(): Promise<OrderItemDTO[]>{
        const items = await this.orderItemRepository.find({ relations: ['pedido', 'produto'] });
        if (!items || items.length === 0) {throw new NotFoundException('')}
        return Promise.all(items.map(item => this.convert(item, ConvertClass.DTO)));
    }

    async findById(id: number): Promise<OrderItemDTO>{
        const orderItem = await this.orderItemRepository.findOne({ where: { idPedidoItem: id }, relations: ['pedido', 'produto'] });
        if (!orderItem) {throw new NotFoundException('')}
        return this.convert(orderItem, ConvertClass.DTO);
    }

    async create(orderItemDTO: OrderItemDTO): Promise<OrderItemDTO>{
        const e = await this.convert(orderItemDTO, ConvertClass.ENTITY);
        if(!e){throw new NotFoundException('')}
        const cOrderItem = await this.orderItemRepository.save(e);
        return await this.findById(cOrderItem.idUsuario);
    }

    async update(orderItemDTO: OrderItemDTO): Promise<OrderItemDTO>{
        const e = await this.convert(orderItemDTO, ConvertClass.ENTITY);
        if(!e){throw new NotFoundException('')}
        const uOrderItem = await this.orderItemRepository.save(e);
        return await this.findById(uOrderItem.idUsuario);
    }

    async disable(id: number): Promise<OrderItemDTO>{
        const orderItemDTO = await this.findById(id);
        if (!orderItemDTO) {throw new NotFoundException('')}
        orderItemDTO.setIsActive(false);

        const e = await this.convert(orderItemDTO, ConvertClass.ENTITY);
        const uOrderItem = await this.orderItemRepository.save(e);
        return await this.findById(uOrderItem.idUsuario);
    }

    async convert<T>(obj: T, convertTo: ConvertClass): Promise<any> {
        switch (convertTo) {
            case ConvertClass.ENTITY:
                if(obj instanceof PedidoItem) {return obj}
                if(obj instanceof OrderItem || obj instanceof OrderItemDTO){
                    let pedidoItem = new PedidoItem()
                    pedidoItem.idPedidoItem = obj.getId();
                    pedidoItem.pedido = obj.getOrder();
                    pedidoItem.produto = obj.getProduct();
                    pedidoItem.produtoQuantidade = obj.getProductQuantity();
                    pedidoItem.ativo = obj.getIsActive();
                    return pedidoItem;
                }
                break;
    
            case ConvertClass.CLASS:
                if(obj instanceof PedidoItem){
                    return new OrderItem(
                        obj.idPedidoItem,
                        obj.pedido,
                        obj.produto,
                        obj.produtoQuantidade,
                        obj.ativo
                    );
                }

                if(obj instanceof OrderItemDTO) {
                    return new OrderItem(
                        obj.getId(),
                        obj.getOrder(),
                        obj.getProduct(),
                        obj.getProductQuantity(),
                        obj.getIsActive()
                    )
                }

                if(obj instanceof OrderItem){
                    return obj;
                }
                break;

            case ConvertClass.DTO:
                if(obj instanceof PedidoItem){
                    return new OrderItem(
                        obj.idPedidoItem,
                        obj.pedido,
                        obj.produto,
                        obj.produtoQuantidade,
                        obj.ativo
                    );
                }

                if(obj instanceof OrderItem){
                    return new OrderItemDTO(
                        obj.getId(),
                        obj.getOrder(),
                        obj.getProduct(),
                        obj.getProductQuantity(),
                        obj.getIsActive()
                    )
                }

                if(obj instanceof OrderItemDTO) {
                    return obj;
                }
                
                break;

            default:
                throw new Error('');
        }
        throw new Error('');
    }
}