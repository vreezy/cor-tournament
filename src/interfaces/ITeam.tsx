import { IAzureDateTime } from './IAzureDateTime';

export interface ITeam {
    etag: string;
    partitionKey: string;
    rowKey: string;
    timestamp: IAzureDateTime;
    name: string;
    map1: string;
    map2: string;
 }