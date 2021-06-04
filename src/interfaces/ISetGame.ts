import { IAzureDateTime } from './IAzureDateTime';

export interface ISetGameEntity {
    punktet1: string;
    punktet2: string;
    gameDateTime: string;
    "gameDateTime@odata.type": "Edm.DateTime";
    team1RowKey: string;
    team2RowKey: string;
}

export interface ISetGame {
    token: string;
    partitionKey: string;
    rowKey: string;
    entity: ISetGameEntity;
}