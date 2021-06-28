export interface ICard {
  id: string;
  name: string;
}

export interface ICardForSale extends ICard {
  cost: number;
  reBuyCost: number;
}