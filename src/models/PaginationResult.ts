import { BotUser } from "./BotUser";

export interface PaginationResult{
    totalCount:number,
    elements:BotUser[]
}