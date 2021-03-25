import { ITwitchItem } from './ITwitchItem';

export interface ITwitchStatus {
   status: string;
   data: ITwitchItem[];
   query: string[];
}