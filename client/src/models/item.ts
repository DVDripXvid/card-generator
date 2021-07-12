import { ICardForSale } from "./card";

export type ItemType = 'Gear' | 'Plot' | 'Tale' | 'Spell';

export interface IItem extends ICardForSale {
  story: string;
  cast: ItemType;
}