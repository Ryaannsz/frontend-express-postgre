import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import API_URL from "../../constants/AppConstants";
import type { Contact } from "../../interface/Contact";
import { showToast } from "../../components/toast/Toast";

export function useAddContact() {
    return useMutation({
        mutationFn: async (newContact: Omit<Contact, 'id'>) => {
            const token = localStorage.getItem("token");

            const response = await axios.post(`${API_URL}/contatos`, newContact, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        }, onSuccess: () => {
            showToast("Contato adicionado com sucesso!", "success")
        }, onError: () => {
            showToast("Erro ao adicionar o contato!", "error")
        }
    });
}
