import { ICard } from "./ICard";
import { PlayerStateEnum } from "./PlayerStateEnum";

export interface IPlayer {
  id?: string;
  username?: string;
  chips?: number;
  cards?: ICard[];
  turn?: boolean;
  imageUrl?: string;
  state?: PlayerStateEnum;
}
