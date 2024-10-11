import axios from "axios";
import { APP_ENV } from "../env";
import { TryError } from "../helpers/common-methods";
import { MessageModel } from "../models/MessageModel";

const botAPIUrl = APP_ENV.BOT_API_URL;
export const botService = {
    sendMessage: (message:MessageModel) => TryError(()=>axios.post(botAPIUrl + `/send`,message)),
}