import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    userId: string;
    exp: number;
    iat: number;
    [key: string]: any;
}

export const decodeToken = (): DecodedToken | null => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            console.warn('Nenhum token encontrado no localStorage');
            return null;
        }

        const decoded = jwtDecode<DecodedToken>(token);

        // Verificar se o token expirou
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            console.warn('Token expirado');
            return null;
        }

        return decoded;
    } catch (error) {
        console.error('Erro ao decodificar token:', error);
        return null;
    }
};

export const getUserIdFromToken = (): string | null => {
    const decoded = decodeToken();
    return decoded?.userId || null;
};

export function isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
}