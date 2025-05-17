
const Header = () => {
    return (
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Lista de Contatos
                    </h1>

                    {/* Espaço reservado para futuros elementos */}
                    <div className="flex space-x-4">
                        {/* Ícone de usuário ou menu pode ser adicionado aqui */}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;