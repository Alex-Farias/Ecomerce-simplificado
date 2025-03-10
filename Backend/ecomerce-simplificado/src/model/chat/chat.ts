import { ChatInterface } from "./interface/chat.interface";

export class Chat implements ChatInterface{
      id: number;
      user1: number;
      user2: number;
      description: string;
      isActive: boolean;

      constructor(id: number,
                  user1: number,
                  user2: number,
                  description: string,
                  isActive: boolean)
      {
            this.id = id;
            this.user1 = user1;
            this.user2 = user2;
            this.description = description;
            this.isActive = isActive;
      }

      public getId(): number{return this.id!}
      public getUser1(): number{return this.user1!}
      public getUser2(): number{return this.user2!}
      public getDescription(): string{return this.description!}
      public getIsActive(): boolean{return this.isActive}

      public setId(id: number){this.id = id}
      public setUser1(user1: number){this.user1 = user1}
      public setUser2(user2: number){this.user2 = user2}
      public setDescription(description: string){this.description = description}
      public setIsActive(isActive: boolean){this.isActive = isActive}
}