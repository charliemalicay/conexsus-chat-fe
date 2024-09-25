import { request } from "../utils";

const BASE_URL = "chat"

const useInitializeChat = () =>
    request({
        url: `${BASE_URL}/`,
        method: "GET"
    });

const useInvokeChat = (data) =>
    request({
        url: `${BASE_URL}/`,
        method: "POST",
        data
    });

export { useInitializeChat, useInvokeChat };
