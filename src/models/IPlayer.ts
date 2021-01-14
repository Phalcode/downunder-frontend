import { ICard } from "./ICard";

export interface IPlayer {
  id?: string;
  username?: string;
  chips?: number;
  cards?: ICard[];
  turn?: boolean;
}
