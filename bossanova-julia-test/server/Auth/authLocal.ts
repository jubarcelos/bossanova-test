import express, { Request, Response } from 'express';
import axios from 'axios';
import bcrypt from 'bcrypt';

const app = express();
const port = 3001;

// URL do json-server
const jsonServerUrl = 'http://localhost:5050/users';

// Middleware para interpretar JSON
app.use(express.json());

// Rota de Login
app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { data: users } = await axios.get(jsonServerUrl);
    const user = users.find((u: any) => u.email === email);

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    return res.status(200).json({
      message: 'Login bem-sucedido',
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
      },
    });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
