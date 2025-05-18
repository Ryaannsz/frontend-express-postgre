import { toast } from 'react-toastify';

export function showToast(message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') {
    toast[type](message);
}