import { IAzureDateTime } from './IAzureDateTime';

export interface IMap {
   etag: string;
   partitionKey: string;
   rowKey: string;
   timestamp: IAzureDateTime;
   name: string;
}