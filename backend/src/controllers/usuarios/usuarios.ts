import { Router, Request, Response } from 'express';
import { usuarioService } from '../../services/usuario.service'; // ajustado para src/services
import { Role } from '@prisma/client';
import { hashPassword } from '../../security/password.js';

const router = Router();

/**
 * Listar usuários com paginação
 * GET /usuarios?page=1&pageSize=50
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 50;

    const users = await usuarioService.list(page, pageSize);
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erro ao listar usuários' });
  }
});

/**
 * Criar novo usuário
 * POST /usuarios
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, role } = req.body;
    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ error: 'nome, email e senha são obrigatórios' });
    }

    const roleEnum: Role = role ?? Role.USER;
    const user = await usuarioService.create(nome, email, senha, roleEnum);

    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Erro ao criar usuário' });
  }
});

/**
 * Atualizar usuário
 * PUT /usuarios/:id
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    const { nome, email, senha, role } = req.body;
    const data: {
      nome?: string;
      email?: string;
      senha_hash?: string;
      role?: Role;
    } = {};

    if (nome) data.nome = nome;
    if (email) data.email = email;
    if (senha) data.senha_hash = await hashPassword(senha);
    if (role) data.role = role;

    const updatedUser = await usuarioService.update(id, data);
    res.status(200).json(updatedUser);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Erro ao atualizar usuário' });
  }
});

/**
 * Remover usuário
 * DELETE /usuarios/:id
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    await usuarioService.remove(id);
    res.status(204).end();
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Erro ao remover usuário' });
  }
});

/**
 * Login
 * POST /usuarios/login
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha)
      return res.status(400).json({ error: 'Email e senha obrigatórios' });

    const { user, token } = await usuarioService.login(email, senha);
    res.status(200).json({ user, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Erro no login' });
  }
});

export default router;
