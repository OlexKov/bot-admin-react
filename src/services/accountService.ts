import axios from "axios";
import { APP_ENV } from "../env";
import { TryError } from "../helpers/common-methods";
import { LoginRequest } from "../models/LoginRequest";
import { LoginResponse } from "../models/LoginResponse";

const accountsAPIUrl = APP_ENV.ACCOUNT_API_URL;
export const accountService = {
    login: (model:LoginRequest) => TryError<LoginResponse>(()=>  axios.post<LoginResponse>(accountsAPIUrl + '/login', model)),
    delete:(userId:number)=> TryError(()=> axios.delete(accountsAPIUrl + `/delete/${userId}`))
}