import axios from "axios";
import { APP_ENV } from "../env";
import { TryError } from "../helpers/common-methods";
import { PaginationResult } from "../models/PaginationResult";

const userAPIUrl = APP_ENV.USERS_API_URL;
export const userService = {
    get: (page:number,size:number) => TryError<PaginationResult>(()=>  axios.get<PaginationResult>(userAPIUrl + `/get/${page}/${size}`)),
}