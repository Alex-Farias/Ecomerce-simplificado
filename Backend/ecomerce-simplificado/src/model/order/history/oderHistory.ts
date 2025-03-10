import { OrderHistoryInterface } from "./interface/orderHistory.interface";

export class OrderHistory implements OrderHistoryInterface{
      id: number;
      orderItemID: number;
      order: number;
      product: number;
      user: number;
      productQuantity: number;
      finalPrice: number;
      isActive: boolean;
      dateAlteration: Date;

      constructor(id: number,
                  orderItemID: number,
                  order: number,
                  product: number,
                  user: number,
                  productQuantity: number,
                  finalPrice: number,
                  isActive: boolean,
                  dateAlteration: Date){
            this.id = id;
            this.orderItemID = orderItemID;
            this.order = order;
            this.product = product;
            this.user = user;
            this.productQuantity = productQuantity;
            this.finalPrice = finalPrice;
            this.isActive = isActive;
            this.dateAlteration = dateAlteration;
      }

      public getId(): number{return this.id!}
      public getOrderItemId(): number{return this.orderItemID!}
      public getOrder(): number{return this.order!}
      public getProduct(): number{return this.product!}
      public getUser(): number{return this.user!}
      public getProductQuantity(): number{return this.productQuantity!}
      public getFinalPrice(): number{return this.finalPrice!}
      public getIsActive(): boolean{return this.isActive!}
      public getDateAlteration(): Date{return this.dateAlteration!}

      public setId(id: number){this.id = id}
      public setOrderItemId(orderItemID: number){this.orderItemID = orderItemID}
      public setOrder(order: number){this.order = order}
      public setProduct(product: number){this.product = product}
      public setUser(user: number){this.user = user}
      public setProductQuantity(productQuantity: number){this.productQuantity = productQuantity}
      public setFinalPrice(finalPrice: number){this.finalPrice = finalPrice}
      public setIsActive(isActive: boolean){this.isActive = isActive}
      public setDateAlteration(dateAlteration: Date){this.dateAlteration = dateAlteration}
}