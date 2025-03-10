import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConvertClass } from "src/config/convertClassesEnum";
import { Pedido } from "src/entity/pedido.entity";
import { Repository } from "typeorm";
import { OrderDTO } from "./dto/order.dto";
import { OrderHistoryService } from "./history/orderHistory.service";
import { OrderItemService } from "./item/orderItem.service";
import { Order } from "./order";

@Injectable()
export class OrderService{
    constructor(
        @InjectRepository(Pedido)
        private orderRepository: Repository<Pedido>,
        private orderItemRepository: OrderItemService,
        private orderHistory: OrderHistoryService
    ){}

    async findAll(): Promise<OrderDTO[]>{
        const orders = await this.orderRepository.find({ relations: ['usuario'] });
        if (!orders || orders.length === 0) {throw new NotFoundException('')}
        return Promise.all(orders.map(order => this.convert(order, ConvertClass.DTO)));
    }

    async findById(id: number): Promise<OrderDTO>{
        const order = await this.orderRepository.findOne({ where: { idPedido: id }, relations: ['usuario'] });
        if (!order) {throw new NotFoundException('')}
        return this.convert(order, ConvertClass.DTO);
    }

    async create(orderDTO: OrderDTO): Promise<OrderDTO>{
        const e = await this.convert(orderDTO, ConvertClass.ENTITY);
        if(!e){throw new NotFoundException('')}
        const cOrder = await this.orderRepository.save(e);
        return await this.findById(cOrder.idUsuario);
    }

    async update(orderDTO: OrderDTO): Promise<OrderDTO>{
        const e = await this.convert(orderDTO, ConvertClass.ENTITY);
        if(!e){throw new NotFoundException('')}
        const uOrder = await this.orderRepository.save(e);
        return await this.findById(uOrder.idPedido);
    }

    async disable(id: number): Promise<boolean>{
        const dOrder = await this.orderRepository.delete(id);
        if(!dOrder){throw new HttpException('Product not found', HttpStatus.NOT_FOUND)}
        return true;
    }

    async convert<T>(obj: T, convertTo: ConvertClass): Promise<any> {
        switch (convertTo) {
            case ConvertClass.ENTITY:
                if(obj instanceof Pedido) {return obj}
                if(obj instanceof Order || obj instanceof OrderDTO){
                    let pedidoHistorico = new Pedido()
                    pedidoHistorico.idPedido = obj.getId();
                    pedidoHistorico.usuario = obj.getUser();
                    return pedidoHistorico;
                }
                break;
    
            case ConvertClass.CLASS:
                if(obj instanceof Pedido){
                    return new Order(
                        obj.idPedido,
                        obj.usuario
                    );
                }

                if(obj instanceof OrderDTO) {
                    return new Order(
                        obj.getId(),
                        obj.getUser()
                    )
                }

                if(obj instanceof Order){
                    return obj;
                }
                break;

            case ConvertClass.DTO:
                if(obj instanceof Pedido){
                    return new Order(
                        obj.idPedido,
                        obj.usuario
                    );
                }

                if(obj instanceof Order){
                    return new OrderDTO(
                        obj.getId(),
                        obj.getUser()
                    )
                }

                if(obj instanceof OrderDTO) {
                    return obj;
                }
                
                break;

            default:
                throw new Error('');
        }
        throw new Error('');
    }
}