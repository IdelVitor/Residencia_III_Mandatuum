import { SignJWT, jwtVerify, JWTPayload } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!); 

const issuer = process.env.JWT_ISSUER ?? 'sedem';
const audience = process.env.JWT_AUDIENCE ?? 'sedem-app';

export async function signAccessToken(payload: JWTPayload, ttl = process.env.JWT_ACCESS_TTL ?? '15m') {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime(ttl) 
    .sign(secret);
}

export async function signRefreshToken(payload: JWTPayload, ttl = process.env.JWT_REFRESH_TTL ?? '7d') {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime(ttl)
    .sign(secret);
}

export async function verifyToken<T extends JWTPayload = JWTPayload>(token: string) {
  const { payload } = await jwtVerify(token, secret, { issuer, audience });
  return payload as T;
}
