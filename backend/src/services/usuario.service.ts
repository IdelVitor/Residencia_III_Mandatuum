import { usuarioRepository } from "../repositories/usuario.repositories"; 
import { hashPassword, verifyPassword } from "../security/password"; 
import { signAccessToken } from "../security/jwt"; 

export class UsuarioService {
  // Método para criar um novo usuário
  async create(nome: string, email: string, senha: string, role = "USER") {
    const exists = await usuarioRepository.findByEmail(email);
    if (exists) throw new Error("Email já cadastrado");

    const senha_hash = await hashPassword(senha);
    return usuarioRepository.create({ nome, email, senha_hash, role });
  }

  // Método de login, gerando o JWT
  async login(email: string, senha: string) {
    const user = await usuarioRepository.findByEmail(email);
    if (!user) throw new Error("Credenciais inválidas");

    const isPasswordValid = await verifyPassword(senha, user.senha_hash);
    if (!isPasswordValid) throw new Error("Credenciais inválidas");

    const token = await signAccessToken({ sub: user.id, email: user.email, role: user.role });

    return { user, token };
  }

  // Método para listar todos os usuários
  async list(page = 1, pageSize = 50) {
    const skip = (page - 1) * pageSize;
    return usuarioRepository.list(pageSize, skip);
  }

  // Método para atualizar os dados do usuário
  async update(id: number, data: { nome?: string; email?: string; senha_hash?: string; role?: string }) {
    return usuarioRepository.update(id, data);
  }

  // Método para excluir o usuário
  async remove(id: number) {
    return usuarioRepository.remove(id);
  }
}

export const usuarioService = new UsuarioService();
