import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { Role } from '@prisma/client'; // Importando a enum de Role

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string; // A senha fornecida pelo usuário

  @IsOptional() // O campo é opcional, caso o role não seja passado
  @IsEnum(Role)
  role?: Role;

  @IsOptional() // O campo senha_hash é gerado dinamicamente, não vem da requisição
  senha_hash?: string;
}
