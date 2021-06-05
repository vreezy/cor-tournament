import { IAzureDateTime } from './IAzureDateTime';

export interface IGame {
    "odata.etag": string;
    partitionKey: string;
    rowKey: string;
    timestamp: IAzureDateTime | string;
    team1RowKey: string;
    team2RowKey: string;
    gameDateTime: IAzureDateTime;
    punktet1: string;
    punktet2: string;
    map3RowKey: string | null;
    map4RowKey: string | null;
 }