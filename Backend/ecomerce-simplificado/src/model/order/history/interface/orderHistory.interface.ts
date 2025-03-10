export interface OrderHistoryInterface{
      id: number;
      orderItemID: number;
      order: number;
      product: number;
      user: number;
      productQuantity: number;
      finalPrice: number;
      isActive: boolean;
      dateAlteration: Date;
}