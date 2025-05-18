import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleLogout = () => {
        localStorage.removeItem('token');
        queryClient.removeQueries({ queryKey: ['contact-userid-data'] });
        navigate('/auth');
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
        >
            Sair
        </button>
    );
};

export default LogoutButton;
