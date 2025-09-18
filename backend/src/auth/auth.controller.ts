import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from 'src/security/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get('ping')
  @ApiOperation({ summary: 'Ping do módulo de auth' })
  ping() {
    return { ok: true, at: new Date().toISOString() };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  login(@Body() body: any) {
    const { email, password } = body ?? {};
    return this.auth.fakeLogin(email, password);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registro' })
  register(@Body() body: any) {
    const { name, email, password, role } = body ?? {};
    return this.auth.fakeRegister(name, email, password, role);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Usuário autenticado (JWT)' })
  @UseGuards(JwtAuthGuard) // <— protege /me com JWT
  me(@Req() req: any) {
    // agora retorna o que veio do token (JwtStrategy.validate)
    return req.user;
  }

  @Get('admin/dashboard')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Dashboard de admin (ADMIN/MASTER)' })
  @UseGuards(JwtAuthGuard, RolesGuard) // <— JWT + ROLE
  @Roles('ADMIN', 'MASTER')
  adminDashboard() {
    return { message: 'Bem-vindo ao dashboard de admin!' };
  }
}
