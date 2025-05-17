// src/hooks/ContactHooks/useDeleteContact.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import API_URL from "../../constants/AppConstants";

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
            console.error("Erro ao deletar contato:", error);
        },
    });
}
