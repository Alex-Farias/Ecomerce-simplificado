import { User } from "../user/user";

export interface Chat{
      id: number;
      user1: User;
      user2: User;
      description: string;
}