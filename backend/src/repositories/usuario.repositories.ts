import { Role } from '@prisma/client';
import { prisma } from '../db/prisma'; 

export const usuarioRepository = {
  findById: (id: number) => prisma.usuario.findUnique({ where: { id } }),

  findByEmail: (email: string) =>
    prisma.usuario.findUnique({ where: { email } }),

create: (data: {
  nome: string;
  email: string;
  senha_hash: string;
  role: Role;  
}) => prisma.usuario.create({ data }),

update: (
  id: number,
  data: { nome?: string; email?: string; senha_hash?: string; role?: Role },
) => prisma.usuario.update({ where: { id }, data }),


  remove: (id: number) => prisma.usuario.delete({ where: { id } }),

  list: (pageSize: number, skip: number) =>
    prisma.usuario.findMany({
      take: pageSize,
      skip: skip,
      orderBy: { criado_em: 'desc' },
    }),
};
