import { AxiosResponse } from "axios";
import { User } from "../models/User";
import { jwtDecode } from "jwt-decode";

export const TryError = async <T>(funct: Function): Promise<AxiosResponse<T, any>> => await funct().catch((error: any) => error)

export const getDataFromJwtToken = (token: string | undefined | null): User | undefined => {
  if (token) {
    const data: any = jwtDecode(token);
    const user: User = {
      id: data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
      name: data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
      surname: data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'],
      email: data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
      exp: data['exp'],
      iss: data['iss'],
      roles: data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
      phone: data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/homephone'],
      image: data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/anonymous'],
    }
    if (new Date(user.exp * 1000) >= new Date()) {
      return user;
    }
  }
  return undefined;
}

export const getQueryString = (filter: any): string => {
  let result = '';
  Object.keys(filter).forEach((key) => {
    if (filter[key] !== undefined
      && filter[key] !== null
      && filter[key] !== ''
      && filter[key]?.length !== 0) {
      const value = typeof (filter[key]) === "object"
        ? JSON.stringify(filter[key])
        : filter[key];
      const symbol = result === '' ? '?' : '&'
      result += `${symbol + key}=${value}`
    }
  });
  return result;
} 
