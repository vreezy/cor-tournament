import { IAzureDateTime } from './IAzureDateTime';

export interface IGame {
    etag: string;
    partitionKey: string;
    rowKey: string;
    timestamp: IAzureDateTime
    team1RowKey: string;
    team2RowKey: string;
    gameDateTime: IAzureDateTime
    punktet1: string;
    punktet2: string;
 }