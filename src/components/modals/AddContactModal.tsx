import { useEffect, useState } from 'react';
import type { Contact } from '../../interface/Contact';
import { useAddContact } from '../../hooks/ContactHooks/useContactPost';
import { getUserIdFromToken } from '../../utils/auth';

interface AddContactModalProps {
    onClose: () => void;
    onSave: (contact: Contact) => void;
}



const AddContactModal = ({ onClose, onSave }: AddContactModalProps) => {

    const [newContact, setNewContact] = useState<Omit<Contact, 'id'>>({
        name: '',
        email: '',
        telefone: '',
        userId: ''
    });
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchedUserId = getUserIdFromToken();
        if (fetchedUserId) {
            setUserId(fetchedUserId);
        }
    }, [])

    useEffect(() => {
        if (userId) {
            setNewContact(prev => ({ ...prev, userId }));
        }
    }, [userId]);

    const { mutate } = useAddContact();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewContact(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(newContact, {
            onSuccess: (data) => {
                console.log(data);
                onSave(data); // <-- passa o contato completo com ID
                onClose();
            },
            onError: (error) => {
                console.error("Erro ao adicionar contato:", error);
            }
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 scale-95 animate-fadeIn">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">Adicionar Novo Contato</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nome</label>
                            <input
                                type="text"
                                name="name"
                                value={newContact.name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={newContact.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Telefone</label>
                            <input
                                type="tel"
                                name="telefone"
                                value={newContact.telefone}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Adicionar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddContactModal;