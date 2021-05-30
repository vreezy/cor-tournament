export interface IParticipant {
   etag: string;
   partitionKey: string;
   rowKey: string;
   timestamp: string;
   user: string;
   teamRowKey: string;
}