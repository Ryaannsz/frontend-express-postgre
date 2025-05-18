import axios from "axios";
import API_URL from "../../constants/AppConstants";
import { useMutation } from "@tanstack/react-query";
import type { Login } from "../../interface/Login";
import { showToast } from "../../components/toast/Toast";

interface LoginResponse {
    token: string;
}

const postLogin = async (data: Login): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(API_URL + "/login", data);
    return response.data;
};

export function useLoginMutate() {
    return useMutation({
        mutationFn: postLogin,
        retry: 2,
        onSuccess: (data) => {
            localStorage.setItem("token", data.token); // agora isso funciona
            console.log("Login bem-sucedido!");
            showToast("Usuário logado com sucesso!", "success")
        },
        onError: (error) => {
            showToast("E-mail ou senha inválidos!", "error")
            console.error("Erro ao fazer login", error);
        },
    });
}
