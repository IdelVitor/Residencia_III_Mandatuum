import bcrypt from "bcryptjs";

// Função para fazer o hash da senha
export async function hashPassword(plain: string) {
  return bcrypt.hash(plain, 10); 
}

// Função para verificar se a senha em texto simples corresponde ao hash armazenado
export async function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash); 
}
