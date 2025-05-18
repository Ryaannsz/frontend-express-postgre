import axios, { type AxiosPromise } from "axios";
import type { Contact } from "../../interface/Contact";
import { useQuery } from "@tanstack/react-query";
import API_URL from "../../constants/AppConstants";
import { getUserIdFromToken } from "../../utils/auth";

const fetch = async (): AxiosPromise<Contact[]> => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/contatos`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
};

export function useContactsByUserId() {
    const userId = getUserIdFromToken();
    const query = useQuery({
        queryKey: ['contact-userid-data', userId],
        queryFn: fetch,
        retry: 1,
    });

    return {
        ...query,
        data: query.data?.data,
    };
}
