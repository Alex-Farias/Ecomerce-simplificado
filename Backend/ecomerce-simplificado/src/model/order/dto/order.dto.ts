import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class OrderDTO{
    @IsOptional()
    @IsInt()
    id: number;
    @IsNotEmpty()
    @IsInt()
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