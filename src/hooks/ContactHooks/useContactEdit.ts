// src/hooks/ContactHooks/useEditContact.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import API_URL from "../../constants/AppConstants";
import type { Contact } from "../../interface/Contact";
import { showToast } from "../../components/toast/Toast";

export function useEditContact() {
    return useMutation({
        mutationFn: async (updatedContact: Contact) => {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `${API_URL}/contatos/${updatedContact.id}`,
                updatedContact,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        },
        onError: (error) => {
            showToast("Erro ao editar o contato!", "error")
            console.error("Erro ao editar o contato:", error);
        }, onSuccess: () => {
            showToast("Contato editado com sucesso!", "success")
        }
    });
}
