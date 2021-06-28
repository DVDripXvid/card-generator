import { ICardForSale } from "./card";

export interface IItem extends ICardForSale {
  story: string;
  cast: string;
}