import { IAzureDateTime } from './IAzureDateTime';

export interface IGame {
    "odata.etag": string;
    PartitionKey: string;
    RowKey: string;
    Timestamp: IAzureDateTime | string;
    team1RowKey: string;
    team2RowKey: string;
    gameDateTime: IAzureDateTime;
    punktet1: string;
    punktet2: string;
 }