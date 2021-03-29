import { ITwitchBroadcaster } from './ITwitchBroadcaster';

export interface ITwitchStatus {
   status: string;
   data: ITwitchBroadcaster[];
   query: string[];
}