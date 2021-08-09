import { ICard } from "./card";

export interface IRole extends ICard {
  privilege: string;
}