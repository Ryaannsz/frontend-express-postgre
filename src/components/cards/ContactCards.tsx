import type { Contact } from '../../interface/Contact';

interface ContactCardProps {
    contact: Contact;
    onClick: () => void;
}

const ContactCard = ({ contact, onClick }: ContactCardProps) => {
    return (
        <div
            onClick={onClick}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{contact.name}</h3>
            <p className="text-gray-600 mb-1">
                <span className="font-medium">Email:</span> {contact.email}
            </p>
            <p className="text-gray-600">
                <span className="font-medium">Telefone:</span> {contact.telefone}
            </p>
        </div>
    );
};

export default ContactCard;