const SERVER_HOST: string = import.meta.env.VITE_APP_SERVER_HOST;
const IMAGES_FOLDER: string = import.meta.env.VITE_APP_IMAGES_FOLDER;
const ACCOUNT_API_URL: string = import.meta.env.VITE_APP_ACCOUNTS_API_URL;
const PROFESSION_API_URL: string = import.meta.env.VITE_APP_PROFESSION_API_URL;
const APP_MODE: string = import.meta.env.VITE_APP_APP_MODE;
const USERS_API_URL: string = import.meta.env.VITE_APP_USERS_API_URL
const ACCESS_KEY: string = import.meta.env.VITE_APP_ACCESS_KEY;
const BOT_API_URL:string = import.meta.env.VITE_APP_BOT_API_URL

const APP_ENV = {
    SERVER_HOST,
    IMAGES_FOLDER,
    ACCOUNT_API_URL,
    APP_MODE,
    PROFESSION_API_URL,
    USERS_API_URL,
    ACCESS_KEY,
    BOT_API_URL
};

export { APP_ENV }