import { CardTypeEnum } from "./CardTypeEnum";

export interface ICard {
  id?: string;
  type?: CardTypeEnum;
  description?: string;
  value?: number;
  source?: string;
}
