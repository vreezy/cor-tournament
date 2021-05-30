export interface IGame {
    etag: string;
    partitionKey: string;
    rowKey: string;
    timestamp: {
        value: string;
        type: string;
    };
    team1RowKey: string;
    team2RowKey: string;
    gameDateTime: {
        value: string;
        type: string;
    };
    punktet1: string;
    punktet2: string;
 }