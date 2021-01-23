import { ICardSet } from "./ICardSet";
import { IPlayer } from "./IPlayer";
import { SessionStateEnum } from "./SessionStateEnum";

export interface ISession {
  id?: string;
  SETTING_NAME?: string;
  SETTING_CHIPS?: number;
  SETTING_MAX_PLAYERS?: number;
  SETTING_MAX_COUNT?: number;
  count?: number;
  players?: IPlayer[];
  state?: SessionStateEnum;
  cardset?: ICardSet;
}
