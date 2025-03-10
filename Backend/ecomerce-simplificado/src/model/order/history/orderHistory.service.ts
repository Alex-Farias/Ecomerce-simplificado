import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConvertClass } from "src/config/convertClassesEnum";
import { PedidoHistorico } from "src/entity/historico_pedido.entity";
import { Repository } from "typeorm";
import { OrderHistoryDTO } from "./dto/orderHistory.dto";
import { OrderHistory } from "./oderHistory";

@Injectable()
export class OrderHistoryService{
    constructor(@InjectRepository(PedidoHistorico) private orderItemRepository: Repository<PedidoHistorico>){}

    async findAll(): Promise<OrderHistoryDTO[]>{
        const histories = await this.orderItemRepository.find({ relations: ['pedido', 'produto'] });
        if (!histories || histories.length === 0) {throw new NotFoundException('')}
        return Promise.all(histories.map(history => this.convert(history, ConvertClass.DTO)));
    }

    async findById(id: number): Promise<OrderHistoryDTO>{
        const orderHistory = await this.orderItemRepository.findOne({ where: { idPedidoHistorico: id }, relations: ['pedido', 'produto'] });
        if (!orderHistory) {throw new NotFoundException('')}
        return this.convert(orderHistory, ConvertClass.DTO);
    }

    async create(orderHistoryDTO: OrderHistoryDTO): Promise<OrderHistoryDTO>{
        const e = await this.convert(orderHistoryDTO, ConvertClass.ENTITY);
        if(!e){throw new NotFoundException('')}
        const cOrderHistory = await this.orderItemRepository.save(e);
        return await this.findById(cOrderHistory.idUsuario);
    }

    async update(orderHistoryDTO: OrderHistoryDTO): Promise<OrderHistoryDTO>{
        const e = await this.convert(orderHistoryDTO, ConvertClass.ENTITY);
        if(!e){throw new NotFoundException('')}
        const uOrderHistory = await this.orderItemRepository.save(e);
        return await this.findById(uOrderHistory.idUsuario);
    }

    async disable(id: number): Promise<OrderHistoryDTO>{
        const orderItemDTO = await this.findById(id);
        if (!orderItemDTO) {throw new NotFoundException('')}
        orderItemDTO.setIsActive(false);

        const e = await this.convert(orderItemDTO, ConvertClass.ENTITY);
        const uOrderHistory = await this.orderItemRepository.save(e);
        return await this.findById(uOrderHistory.idUsuario);
    }

    async convert<T>(obj: T, convertTo: ConvertClass): Promise<any> {
        switch (convertTo) {
            case ConvertClass.ENTITY:
                if(obj instanceof PedidoHistorico) {return obj}
                if(obj instanceof OrderHistory || obj instanceof OrderHistoryDTO){
                    let pedidoHistorico = new PedidoHistorico()
                    pedidoHistorico.idPedidoHistorico = obj.getId();
                    pedidoHistorico.pedidoItem = obj.getOrderItemId();
                    pedidoHistorico.pedido = obj.getOrder();
                    pedidoHistorico.produto = obj.getProduct();
                    pedidoHistorico.usuario = obj.getUser();
                    pedidoHistorico.produtoQuantidade = obj.getProductQuantity();
                    pedidoHistorico.valorTotal = obj.getFinalPrice();
                    pedidoHistorico.ativo = obj.getIsActive();
                    pedidoHistorico.dataAlteracao = obj.getDateAlteration();
                    return pedidoHistorico;
                }
                break;
    
            case ConvertClass.CLASS:
                if(obj instanceof PedidoHistorico){
                    return new OrderHistory(
                        obj.idPedidoHistorico,
                        obj.pedidoItem,
                        obj.pedido,
                        obj.produto,
                        obj.usuario,
                        obj.produtoQuantidade,
                        obj.valorTotal,
                        obj.ativo,
                        obj.dataAlteracao
                    );
                }

                if(obj instanceof OrderHistoryDTO) {
                    return new OrderHistory(
                        obj.getId(),
                        obj.getOrderItemId(),
                        obj.getOrder(),
                        obj.getProduct(),
                        obj.getUser(),
                        obj.getProductQuantity(),
                        obj.getFinalPrice(),
                        obj.getIsActive(),
                        obj.getDateAlteration()
                    )
                }

                if(obj instanceof OrderHistory){
                    return obj;
                }
                break;

            case ConvertClass.DTO:
                if(obj instanceof PedidoHistorico){
                    return new OrderHistory(
                        obj.idPedidoHistorico,
                        obj.pedidoItem,
                        obj.pedido,
                        obj.produto,
                        obj.usuario,
                        obj.produtoQuantidade,
                        obj.valorTotal,
                        obj.ativo,
                        obj.dataAlteracao
                    );
                }

                if(obj instanceof OrderHistory){
                    return new OrderHistoryDTO(
                        obj.getId(),
                        obj.getOrderItemId(),
                        obj.getOrder(),
                        obj.getProduct(),
                        obj.getUser(),
                        obj.getProductQuantity(),
                        obj.getFinalPrice(),
                        obj.getIsActive(),
                        obj.getDateAlteration()
                    )
                }

                if(obj instanceof OrderHistoryDTO) {
                    return obj;
                }
                
                break;

            default:
                throw new Error('');
        }
        throw new Error('');
    }
}