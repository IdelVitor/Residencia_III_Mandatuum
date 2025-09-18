import { Injectable, ConflictException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '@prisma/client'; // Acessando a enum Role
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private repo: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const existing = await this.repo.findByEmail(createUserDto.email);
    if (existing) throw new ConflictException('Email já registrado');
    
    const hash = await bcrypt.hash(createUserDto.password, 10);
    
    return this.repo.create({
      ...createUserDto,
      senha_hash: hash, 
      nome: createUserDto.name, 
      role: createUserDto.role ?? Role.USER, 
    });
  }

  async findByEmail(email: string) {
    return this.repo.findByEmail(email);
  }

  async findById(id: string) {
    return this.repo.findById(id);
  }
}
