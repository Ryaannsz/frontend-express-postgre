import { useState } from 'react';
import { useRegisterMutate } from '../hooks/AuthHooks/useRegister';
import { useLoginMutate } from '../hooks/AuthHooks/useLogin';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const [passwordError, setPasswordError] = useState<string>(''); // Novo estado para a senha

  const { mutate: registro, isError: isErrorRegiser, isSuccess: isSuccessRegister, isPending: isPedingRegister } = useRegisterMutate();
  const { mutate: login, isError: isErrorLogin, isSuccess: isSuccessLogin, isPending: isPedingLogin } = useLoginMutate();

  const isPasswordValid = (password: string): boolean => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasSpecialChar;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      if (!isPasswordValid(value)) {
        setPasswordError('A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um caractere especial.');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!isPasswordValid(formData.password)) {
      setPasswordError('A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um caractere especial.');
      return;
    }

    if (isLogin) {
      login(formData);
      navigate('/contatos')
    } else {
      registro(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Faça login na sua conta' : 'Crie uma nova conta'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className={`relative overflow-hidden ${isLogin ? 'h-auto' : 'h-auto'}`}>
              <div className={`transition-all duration-500 ease-in-out ${isLogin ? 'transform -translate-y-full opacity-0 h-0' : 'transform translate-y-0 opacity-100 h-auto'}`}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome completo
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {passwordError && (
                <p className="mt-2 text-sm text-red-600">{passwordError}</p>  // Mensagem de erro da senha
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={!!passwordError}  // Desabilita o botão se a senha não for válida
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLogin ? 'Entrar' : 'Registrar'}
              </button>
            </div>
          </form>

          {/* Mensagens de status */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
              >
                {isLogin ? 'Criar uma nova conta' : 'Já tenho uma conta'}
              </button>

              {/* Exibindo mensagens de erro/sucesso */}
              {isPedingRegister || isPedingLogin ? (
                <p className="mt-2 text-sm text-blue-600">Enviando dados...</p>
              ) : null}

              {isSuccessRegister && !isLogin ? (
                <p className="mt-2 text-sm text-green-600">Cadastro realizado com sucesso!</p>
              ) : null}

              {isSuccessLogin && isLogin ? (
                <p className="mt-2 text-sm text-green-600">Login realizado com sucesso!</p>
              ) : null}

              {isErrorRegiser && !isLogin ? (
                <p className="mt-2 text-sm text-red-600">Erro ao registrar. Tente novamente.</p>
              ) : null}

              {isErrorLogin && isLogin ? (
                <p className="mt-2 text-sm text-red-600">Email ou senha incorretos.</p>
              ) : null}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
