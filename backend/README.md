# Backend + Prisma + PostgreSQL (DEV) — sem Shadow DB

Este backend usa **Prisma ORM** com **PostgreSQL**.  
Abaixo, duas formas de rodar o banco:

- **Opção A:** Postgres via **Docker Compose**
- **Opção B:** Postgres **instalado na máquina**

> **Importante:** não usamos `shadowDatabaseUrl`. As migrações funcionam normalmente sem shadow DB.

---

## 0) Requisitos

- Node.js 18+ (ou 20+)
- npm
- **Escolha 1:**
  - Docker Desktop (se usar **Opção A**), **ou**
  - PostgreSQL 14+ instalado (se usar **Opção B**)

---

## 1) Configuração do Prisma (comum às duas opções)

### 1.1 `backend/prisma/schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL") // sem shadowDatabaseUrl
}
```

### 1.2 `backend/.env` (use **URL literal**, sem `${VAR}`)
```env
DATABASE_URL="postgresql://SEU_USER:SUA_SENHA@SEU_HOST:5432/SEU_DB?schema=public"
```

Exemplos de `DATABASE_URL` prontos:
- **Docker (porta mapeada):**  
  `postgresql://sedem_user:sedem_pass@localhost:5432/sedem_db?schema=public`
- **Postgres local (instalado):**  
  `postgresql://seu_user:sua_senha@localhost:5432/seu_db?schema=public`

---

## 2) Escolha seu caminho

### 🔵 Opção A — Docker Compose (recomendado pela praticidade)

Na **raiz do repositório** (onde está o `docker-compose.yml` do Postgres):

```bash
docker compose up -d postgres
```

> Isso expõe o Postgres em `localhost:5432`.  
> Ajuste o `backend/.env` para algo como:
> ```
> DATABASE_URL="postgresql://sedem_user:sedem_pass@localhost:5432/sedem_db?schema=public"
> ```

### 🟢 Opção B — Postgres instalado na máquina

1) Instale o PostgreSQL (Windows/macOS/Linux).  
2) Crie usuário e banco para o projeto (troque pelos nomes que quiser):
```sql
-- abra o psql (Windows: use o "SQL Shell (psql)" ou adicione o bin ao PATH)
-- logado como superuser (ex.: postgres), execute:

CREATE USER sedem_user WITH PASSWORD 'sedem_pass';
CREATE DATABASE sedem_db OWNER sedem_user;
GRANT ALL PRIVILEGES ON DATABASE sedem_db TO sedem_user;
```

3) Em `backend/.env`, aponte para seu banco local:
```
DATABASE_URL="postgresql://sedem_user:sedem_pass@localhost:5432/sedem_db?schema=public"
```

> Se você usar outro usuário/senha/DB, ajuste a URL.

---

## 3) Instalar dependências e gerar client (no diretório `backend/`)

```bash
npm install
npx prisma generate
```

> Import no código (singleton recomendado):
> ```ts
> import { PrismaClient } from "@prisma/client";
> const prisma = new PrismaClient();
> ```

---

## 4) Aplicar o schema ao banco (sem shadow DB)

Escolha **uma**:

### Com migrações (recomendado)
```bash
npx prisma migrate dev --name init
```

### Sem migrações (empurra o schema direto — útil em protótipo)
```bash
npx prisma db push
```

---

## 5) Abrir o Prisma Studio (UI)
```bash
npx prisma studio
```
Abre em `http://localhost:5555`.

---

## 6) Notas importantes

- O Prisma **não** expande `${VAR}` dentro de `DATABASE_URL`. Use a URL **completa**.
- O `.env` do **backend** é **independente** do `.env` da **raiz** (Docker).
- Se você mudar usuário/senha/nome do DB no Docker ou no Postgres local, **atualize** a `DATABASE_URL`.
- Em produção, aplique migrações com:
  ```bash
  npx prisma migrate deploy
  ```

---

## 7) Scripts úteis (adicione no `backend/package.json`)

```json
{
  "scripts": {
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:push": "prisma db push",
    "prisma:studio": "prisma studio",
    "prisma:reset": "prisma migrate reset -f"
  }
}
```

---

## 8) Fluxo típico em uma máquina nova

1. **(A ou B)** Suba/prepare o Postgres  
2. Configure `backend/.env` com **URL literal**  
3. `npm install`  
4. `npx prisma generate`  
5. `npx prisma migrate dev` (ou `db push`)  
6. `npx prisma studio`
