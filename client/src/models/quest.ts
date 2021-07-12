import { ICard } from "./card";

export interface IQuest extends ICard {
  gold: string;
  conditions: string;
  fame: string;
  penalties?: string;
  rules?: string;
}