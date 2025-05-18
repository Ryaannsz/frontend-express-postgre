// src/hooks/ContactHooks/useDeleteContact.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import API_URL from "../../constants/AppConstants";
import { showToast } from "../../components/toast/Toast";

export function useDeleteContact() {
    return useMutation({
        mutationFn: async (contactId: string) => {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`${API_URL}/contatos/${contactId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        },
        onError: (error) => {
            showToast("Erro ao deletar o contato!", "error")
            console.error("Erro ao deletar contato:", error);
        }, onSuccess: () => {
            showToast("Contato deletado com sucesso!", "success")
        }
    });
}
