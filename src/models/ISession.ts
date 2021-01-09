import { IPlayer } from "./IPlayer";

export interface ISession {
  id?: string;
  name?: string;
  chips?: number;
  maxPlayers?: number;
  count?: number;
  players?: IPlayer[];
}
