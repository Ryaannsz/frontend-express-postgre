import { useState } from 'react';
import type { Contact } from '../../interface/Contact';

interface ContactModalProps {
    contact: Contact;
    onClose: () => void;
    onSave: (contact: Contact) => void;
    onDelete: (id: string) => void;
}

const ContactModal = ({ contact, onClose, onSave, onDelete }: ContactModalProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContact, setEditedContact] = useState<Contact>({ ...contact });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedContact(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(editedContact);

        setIsEditing(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 scale-95 animate-fadeIn">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {isEditing ? 'Editar Contato' : 'Detalhes do Contato'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nome</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={editedContact.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900">{contact.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={editedContact.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900">{contact.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Telefone</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="telefone"
                                    value={editedContact.telefone}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                            ) : (
                                <p className="mt-1 text-gray-900">{contact.telefone}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Salvar
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => { onDelete(contact.id), onClose() }}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Remover
                                </button>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Editar
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;