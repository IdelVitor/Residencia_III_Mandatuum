import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PrismaService {
  constructor() {
    prisma.$connect();
  }

  get prisma() {
    return prisma;
  }
}
