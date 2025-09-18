import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  fakeRegister(name: string, email: string, password: string, role: string = 'MASTER') {
    if (!email || !password) throw new BadRequestException('email e password são obrigatórios');
    const payload = { sub: 1, email, role };
    const access_token = this.jwt.sign(payload);
    const refresh_token = this.jwt.sign({ ...payload, type: 'refresh' }, { expiresIn: '7d' });
    return { access_token, refresh_token };
  }

  fakeLogin(email: string, password: string) {
    if (!email || !password) throw new UnauthorizedException('Credenciais inválidas');
    const payload = { sub: 1, email, role: 'MASTER' };
    const access_token = this.jwt.sign(payload);
    const refresh_token = this.jwt.sign({ ...payload, type: 'refresh' }, { expiresIn: '7d' });
    return { access_token, refresh_token };
  }
}
