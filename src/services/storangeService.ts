import { APP_ENV } from "../env";


const accessKey = APP_ENV.ACCESS_KEY;


export const storageService = {
    saveToken: async (accessToken: string) =>  localStorage.setItem(accessKey, accessToken),
    getAccessToken: () => localStorage.getItem(accessKey),
    removeToken: () =>   localStorage.removeItem(accessKey),
}