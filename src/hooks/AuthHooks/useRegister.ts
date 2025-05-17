import axios, { type AxiosPromise } from "axios";
import type { Register } from "../../interface/Register";
import API_URL from "../../constants/AppConstants";
import { useMutation } from "@tanstack/react-query";

const postRegister = async (data: Register): AxiosPromise<any> => {
    const response = axios.post(API_URL+"/register", data);
    return response;
}


export function useRegisterMutate(){

    const mutate = useMutation({
        mutationFn: postRegister,
        retry: 2,

    })
    return mutate;
}