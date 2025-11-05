# 🧭 Sistema SEDEM — Mandatuum System  
**Residência de Software | UNIT | Squad 20**

---

## 📘 Descrição Geral

O **Sistema SEDEM (Mandatuum System)** é uma aplicação completa de **gestão política e administrativa**, composta por:

- Um **backend** robusto em **Spring Boot + PostgreSQL + JWT**
- Um **frontend** moderno em **Next.js + TypeScript**
- Um ambiente **Docker Compose** para orquestrar os serviços

O sistema oferece **autenticação segura com JWT**, **gestão de usuários**, **painel administrativo**, **gráficos dinâmicos**, e integração entre as camadas front e back.

---

## 🧩 Estrutura Geral do Projeto

```
Residencia_III_Mandatuum/
├── backend/
│   ├── api/
│   │   ├── src/main/java/com/sedem/api/
│   │   │   ├── controllers/      # Controladores REST
│   │   │   ├── models/           # Entidades JPA
│   │   │   ├── repositories/     # Interfaces JPA Repository
│   │   │   ├── services/         # Lógica de negócio
│   │   │   └── security/         # JWT, filtros e configuração
│   │   └── resources/
│   │       └── application.properties
│   └── pom.xml
│
├── frontend/
│   ├── app/                      # Páginas e rotas do Next.js
│   ├── components/               # Componentes reutilizáveis
│   ├── styles/                   # Estilos globais e CSS Modules
│   └── .env.local                # Configurações de ambiente
│
└── docker-compose.yml
```

---

## 🧱 Requisitos

### 🔧 Ferramentas necessárias

| Ferramenta | Versão recomendada | Função |
|-------------|--------------------|--------|
| **Java JDK** | 21+ | Executar o backend |
| **Maven** | 3.9+ | Gerenciar dependências do backend |
| **Node.js** | 18+ | Executar o frontend |
| **npm** | 9+ | Gerenciar pacotes do frontend |
| **Docker + Docker Compose** | 20+ | Subir containers (PostgreSQL e Adminer) |

---

## 🐳 1️⃣ Configurar o Banco de Dados (Docker Compose)

Crie o arquivo `docker-compose.yml` na raiz do projeto:

```yaml
version: '3'

services:
  postgres:
    image: postgres:16-alpine
    container_name: sedem-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: sedem_user
      POSTGRES_PASSWORD: sedem_pass
      POSTGRES_DB: sedem_db
      TZ: America/Maceio
    ports:
      - "5432:5432"
    networks:
      - sedem-network
    volumes:
      - pgdata:/var/lib/postgresql/data

  adminer:
    image: adminer:latest
    container_name: sedem-adminer
    restart: unless-stopped
    ports:
      - "8080:8080"
    networks:
      - sedem-network
    depends_on:
      - postgres

networks:
  sedem-network:
    driver: bridge

volumes:
  pgdata:
```

---

### ▶️ Subir os containers

```bash
docker-compose up -d
```

Acesse:
- Banco: `localhost:5432`
- Interface Adminer: [http://localhost:8080](http://localhost:8080)

Use:
```
Servidor: postgres
Usuário: sedem_user
Senha: sedem_pass
Banco: sedem_db
```

---

## ⚙️ 2️⃣ Configurar o Backend (Spring Boot)

### 📁 Caminho: `backend/api/`

#### **application.properties**
```properties
# CONFIGURAÇÃO DO BANCO
spring.datasource.url=jdbc:postgresql://localhost:5432/sedem_db
spring.datasource.username=sedem_user
spring.datasource.password=sedem_pass
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# JWT
jwt.secret=3f9c82f4b8b1dce19a7f49201c5d!@#MandatuumSystemJWTKey2025
jwt.expiration=3600000

# SERVIDOR
server.port=8082
```

---

### 🧰 Compilar e executar o backend

Entre na pasta do backend:
```bash
cd backend/api
```

Execute os comandos abaixo:
```bash
mvn clean install
mvn spring-boot:run
```

> O backend iniciará em **http://localhost:8082**

---

### ✅ Testar o backend

Acesse:
```
http://localhost:8082/swagger-ui/index.html
```

Endpoints principais:
- `POST /auth/register` → cadastrar usuário
- `POST /auth/login` → autenticar e gerar token JWT
- `GET /usuarios` → listar usuários (necessita token)

---

## 🖥️ 3️⃣ Configurar o Frontend (Next.js)

### 📁 Caminho: `frontend/`

---

Entre na pasta do frontend:
```bash
cd frontend
```

### Instalar dependências principais
```bash
npm install
```

### Instalar pacotes adicionais
```bash
npm install @hello-pangea/dnd recharts lucide-react
```

---

### Criar o arquivo `.env.local`
Crie na raiz de `frontend/`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8082
```

---

### Executar o frontend
```bash
npm run dev
```

Acesse:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 🔑 4️⃣ Acesso ao Sistema

Você pode inserir usuários diretamente no banco via Adminer:

```sql
INSERT INTO usuarios (nome, email, senha_hash, role, criado_em, atualizado_em)
VALUES (
  'Admin Teste',
  'admin@sedem.local',
  '$2a$10$N9qo8uLOickgx2ZMRZo4i.ejSjjl28uQm9keWZYcCjvLCwN3d1q5u', -- senha: admin123
  'ADMIN',
  NOW(),
  NOW()
);
```

💻 Login no frontend:
```
Email: admin@sedem.local
Senha: admin123
```

---

## 📈 5️⃣ Estrutura Funcional

| Camada | Tecnologias | Função |
|--------|--------------|--------|
| **Banco de Dados** | PostgreSQL 16 | Armazenamento relacional |
| **Backend** | Spring Boot 3.5.6 + JPA + JWT | API REST, autenticação, segurança |
| **Frontend** | Next.js + TypeScript + Tailwind | Interface visual moderna |
| **Infraestrutura** | Docker Compose | Orquestração dos containers |

---

## 🧠 6️⃣ Observações Técnicas

- O token JWT é armazenado no **localStorage** do navegador.
- O backend valida o token em cada requisição.
- O CORS está habilitado para `http://localhost:3000` no arquivo `SecurityConfig.java`.
- O Docker usa volumes persistentes para manter os dados do PostgreSQL.
- O Swagger permite testar todos os endpoints de forma interativa.

---

## 👨‍💻 7️⃣ Contribuição

1. Crie uma nova branch:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
2. Faça suas alterações.
3. Envie o PR para `develop`.

---

## 🧾 8️⃣ Contato e Créditos

**Projeto SEDEM — Mandatuum System**  
📍 Universidade Tiradentes (UNIT)  
👨‍💻 Desenvolvido por **Squad 20 — Residência de Software**  
📧 Contato: `squad20@unit.br`  
🗓️ Aracaju-SE, 2025
