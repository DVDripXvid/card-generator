import { ICard } from "./card";

export interface IAdventurer extends ICard {
  story?: string;
  strength: string;
  magic: string;
  cast: string;
}