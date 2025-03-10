import { OrderInterface } from "./interface/order.interface";

export class Order implements OrderInterface{
  id: number;
  user: number;

  constructor(id: number,
              user: number){
    this.id = id;
    this.user = user;
  }

  public getId(): number{return this.id!}
  public getUser(): number{return this.user!}
  
  public setId(id: number){this.id = id}
  public setUser(user: number){this.user = user}
}