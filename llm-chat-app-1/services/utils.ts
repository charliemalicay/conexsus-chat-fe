import axios from "axios";

import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query"

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BE_API_URL,
    headers: {
        accept: "application/json, text/plain, */*",
    },
});

const request = async (options) => {
    const onSuccess = (response) => {
        return response?.data?.data;
    };

    const onError = (error) => {
        return Promise.reject(error.response?.data);
    };

    return client(options).then(onSuccess).catch(onError);
};

const useApiGet = (key, fn, options) => useQuery({
    queryKey: key,
    queryFn: fn,
    ...options
});

const useApiPost = (fn, success, error, invalidateKey, options) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: fn,
        onSuccess: (data) => {
            invalidateKey &&
            invalidateKey.forEach((key) => {
                queryClient.invalidateQueries(key);
            });
            success && success(data);
        },
        onError: error,
        retry: 2,
        ...options,
    });
};

export { request, useApiGet, useApiPost }
