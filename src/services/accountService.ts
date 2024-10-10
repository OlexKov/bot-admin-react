import axios from "axios";
import { APP_ENV } from "../env";
import { TryError } from "../helpers/common-methods";
import { LoginRequest } from "../models/LoginRequest";
import { LoginResponse } from "../models/LoginResponse";

const accountsAPIUrl = APP_ENV.ACCOUNT_API_URL;
export const accountService = {
    login: (model:LoginRequest) => TryError<LoginResponse>(()=>  axios.post<LoginResponse>(accountsAPIUrl + '/login', model)),
   // register:(user:UserRegisterModel)=> TryError(()=> axios.post(accountsAPIUrl + '/sign-up', user,formPostConfig)),
}