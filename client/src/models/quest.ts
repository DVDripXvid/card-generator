import { ICard } from "./card";

export interface IQuest extends ICard {
  no: string;
  conditions: string;
  rewards: string;
  penalties?: string;
  rules?: string;
}