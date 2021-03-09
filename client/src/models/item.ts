import { ICard } from "./card";

export interface IItem extends ICard {
  story: string;
  cast: string;
}