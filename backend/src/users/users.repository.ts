import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { Prisma } from '@prisma/client'; // Certifique-se de importar Prisma corretamente

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.prisma.usuario.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prisma.prisma.usuario.findUnique({ where: { id: parseInt (id) } });
  }

  async create(data: Prisma.UsuarioCreateInput): Promise<any> {
  return this.prisma.prisma.usuario.create({ data });
}
}
