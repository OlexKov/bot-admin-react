import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { message } from 'antd'
import { APP_ENV } from '../env';
import { store } from '../store/index';
import { storageService } from '../services/storangeService';
import { clearUserData } from '../store/redusers/UserReduser';



export const SetupInterceptors = () => {
    axios.defaults.baseURL = APP_ENV.SERVER_HOST
    axios.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      config.headers['Authorization'] = `Bearer ${storageService.getAccessToken()}`;
      return config
    },
    async (error) => {
      message.error(`${error.status} ${error.message}`)
      return Promise.reject(error);
    });

  axios.interceptors.response.use(
    async response => response,
    async (error: AxiosError) => {
      const status = error.response?.status || 500;
      switch (status) {

        case 401:
          if (store.getState()) {
            storageService.removeToken();
            store.dispatch(clearUserData())
          }
          window.location.replace("/login")
          break;
        case 403:
          window.location.replace("/forbiden")
          break;


        default: {
           // const location = window.location.pathname.slice(1);
          //  window.location.replace(`/error?status=${status}&title=${status}&subTitle=${error.message}${location === '' ? '&location=homepage' : ''}`);
            message.error(`${error.status} ${error.message}`)
        }

      }
      return Promise.reject(error);
    }
  );
}