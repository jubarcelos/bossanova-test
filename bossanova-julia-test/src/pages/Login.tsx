import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { tv } from 'tailwind-variants';
import Pages from '../components/shared/Pages';

// Interface para o estado do formulário de login
interface LoginFormState {
  email: string;
  password: string;
}

// Interface para a resposta de sucesso do login
interface LoginResponse {
  message: string;
  user: {
    id: string;
    email: string;
    displayName: string;
  };
}

// Interface para a resposta de erro do login
interface LoginError {
  message: string;
  status?: number;
}

// Estilos usando Tailwind Variants
const styles = tv({
  slots: {
    containerStyle: 'relative',
    pageStyle: 'bg-greyScale-clear flex items-center gap-6 mt-15',
    buttonStyle:
      'flex justify-center items-center py-3 px-4 rounded-sm gap-2 text-branding-primary bg-greyScale-white hover:bg-primaryScale-clear active:bg-primaryScale-ligh',
    titleStyle: 'flex justify-center items-center text-greyScale-dark text-lg',
    subTitleStyle: 'text-et',
    inputStyle: 'px-3 py-1 w-[500px] bg-greyScale-white rounded-sm',
    inputContainer: 'flex flex-col gap-3 justify-center items-center bg-greyScale-clear w-[650px]',
    errorStyle: 'text-red-500 text-sm mt-2',
  },
});

const {
  pageStyle,
  containerStyle,
  buttonStyle,
  titleStyle,
  subTitleStyle,
  inputStyle,
  inputContainer,
  errorStyle,
} = styles();

const Login: React.FC = () => {
  const [formState, setFormState] = useState<LoginFormState>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Função para lidar com mudanças no formulário
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    setError(null); // Limpa o erro antes de enviar

    try {
      const response = await axios.post<LoginResponse>('http://localhost:3001/login', formState);

      // Sucesso no login
      console.log('Login bem-sucedido:', response.data);
      navigate('/'); // Redireciona para a rota inicial
    } catch (err: unknown) {
      const axiosError = err as AxiosError<LoginError>;
      const errorMessage = axiosError.response?.data?.message || 'Erro desconhecido';
      setError(errorMessage); // Define o erro no estado
    }
  };

  return (
    <div className={containerStyle()}>
      <Pages className={pageStyle()}>
        <h2 className={titleStyle()}>Faça seu login utilizando email cadastrado</h2>
        <h2 className={subTitleStyle()}>Instruções no Readme</h2>
        <form className={inputContainer()} onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={inputStyle()}
            value={formState.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            className={inputStyle()}
            value={formState.password}
            onChange={handleInputChange}
            required
          />
          {error && <p className={errorStyle()}>{error}</p>}
          <button type="submit" className={buttonStyle()}>
            Login
          </button>
        </form>
      </Pages>
    </div>
  );
};

export default Login;
