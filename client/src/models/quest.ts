export interface IQuest {
  id: string;
  name: string;
  no: string;
  conditions: string;
  rewards: string;
  penalties?: string;
  rules?: string;
}