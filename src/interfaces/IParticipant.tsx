import { IAzureDateTime } from './IAzureDateTime';

export interface IParticipant {
   etag: string;
   partitionKey: string;
   rowKey: string;
   timestamp: IAzureDateTime;
   user: string;
   teamRowKey: string;
}