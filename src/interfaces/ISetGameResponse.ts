export interface ISetGameResponse {
    message: string;
    rowKey: string;
    status: "ok" | "failed" |  "exception"
}