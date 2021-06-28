import { ICardForSale } from "./card";

export interface IAdventurer extends ICardForSale {
  story?: string;
  strength: string;
  magic: string;
  cast: string;
}