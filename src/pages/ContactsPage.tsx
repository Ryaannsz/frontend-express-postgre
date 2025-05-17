import { useEffect, useState } from 'react';
import ContactCard from '../components/cards/ContactCards';
import ContactModal from '../components/modals/ContactModal';
import AddContactModal from '../components/modals/AddContactModal';
import type { Contact } from '../interface/Contact';
import { useContactsByUserId } from '../hooks/ContactHooks/useContactByUserId';
import { useDeleteContact } from '../hooks/ContactHooks/useContactDelete';
import { useEditContact } from '../hooks/ContactHooks/useContactEdit';

const ContactsPage = () => {
    // Estado inicial vazio conforme a interface
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const { mutate: deleteContact } = useDeleteContact()

    const { mutate: updateContact } = useEditContact();

    const { data: contactsHook } = useContactsByUserId()

    useEffect(() => {
        if (contactsHook) {
            setContacts(contactsHook);
        }
    }, [contactsHook])

    // Função para adicionar novo contato
    const handleAddContact = (newContact: Omit<Contact, 'id'>) => {
        setContacts([...contacts, {
            ...newContact,
            id: (contacts.length + 1).toString()
        }]);
        setIsAddModalOpen(false);
    };

    // Função para atualizar contato
    const handleUpdateContact = (updatedContact: Contact) => {
        setContacts(contacts.map(contact =>
            contact.id === updatedContact.id ? updatedContact : contact
        ));
        updateContact(updatedContact);
        setSelectedContact(null);
    };

    // Função para remover contato
    const handleDeleteContact = (id: string) => {
        deleteContact(id);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Meus Contatos</h1>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
                    >
                        + Novo Contato
                    </button>
                </div>

                {contacts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Nenhum contato cadastrado ainda.</p>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all"
                        >
                            Adicionar primeiro contato
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {contacts.map(contact => (
                            <ContactCard
                                key={contact.id}
                                contact={contact}
                                onClick={() => setSelectedContact(contact)}
                            />
                        ))}
                    </div>
                )}

                {selectedContact && (
                    <ContactModal
                        contact={selectedContact}
                        onClose={() => setSelectedContact(null)}
                        onSave={handleUpdateContact}
                        onDelete={handleDeleteContact}
                    />
                )}

                {isAddModalOpen && (
                    <AddContactModal
                        onClose={() => setIsAddModalOpen(false)}
                        onSave={handleAddContact}
                    />
                )}
            </div>
        </div>
    );
};

export default ContactsPage;