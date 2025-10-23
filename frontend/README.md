# 🧭 Frontend — Sistema SEDEM (Mandatuum)

Frontend do **Sistema de Gestão Política SEDEM**, desenvolvido com **Next.js + TypeScript**, integrado ao backend em **Spring Boot + PostgreSQL + Docker**.  
Este projeto fornece as interfaces para usuários, administradores e gestores acessarem as funcionalidades políticas, administrativas e financeiras do sistema.

---

## 🚀 Tecnologias Utilizadas

- **Next.js 15+**
- **React 18+**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (ícones modernos)
- **Recharts** (gráficos e dashboards)
- **@hello-pangea/dnd** (drag-and-drop moderno e acessível)
- **CSS Modules**
- **Context API / Hooks**
- **Vercel** (para deploy)

---

## 📦 Instalação

Certifique-se de ter instalado:

- **Node.js** (>= 18.x)
- **npm** ou **yarn**
- O backend rodando localmente em `http://localhost:8082`

---

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd frontend
```

---

### 2️⃣ Instalar as dependências principais

```bash
npm install
```

---

### 3️⃣ Instalar as dependências adicionais

Esses pacotes são necessários para componentes gráficos e interativos:

```bash
npm install @hello-pangea/dnd recharts lucide-react
```

---

### 4️⃣ Configurar o ambiente (.env.local)

Crie um arquivo chamado `.env.local` na raiz do projeto **frontend** e adicione:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8082
```

> Essa variável define o endpoint da API do backend (Spring Boot).

---

## 🧱 Estrutura do Projeto

```
frontend/
├── app/
│   ├── login/                # Página de login
│   ├── dashboard/            # Painel principal
│   ├── usuarios/             # Gestão de usuários
│   ├── financeiro/           # Gestão financeira
│   └── ...
│
├── components/               # Componentes reutilizáveis
├── contexts/                 # Context API (autenticação, temas, etc.)
├── hooks/                    # Hooks customizados
├── lib/                      # Configurações de API e helpers
├── public/                   # Imagens, ícones e assets estáticos
├── styles/                   # Estilos globais
└── package.json
```

---

## 🧑‍💻 Comandos Principais

### Rodar em modo desenvolvimento
```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

### Build de produção
```bash
npm run build
```

---

### Rodar em produção (após build)
```bash
npm start
```

---

### Lint e verificação de código
```bash
npm run lint
```

---

## 🔐 Integração com o Backend

O frontend se conecta ao **backend Spring Boot** por meio das rotas REST expostas na API:

| Função | Método | Rota Backend | Descrição |
|--------|---------|---------------|------------|
| Login | `POST` | `/auth/login` | Autenticação e geração de JWT |
| Registrar usuário | `POST` | `/auth/register` | Criação de novos usuários |
| Listar usuários | `GET` | `/usuarios` | Retorna todos os usuários |
| Atualizar usuário | `PUT` | `/usuarios/{id}` | Atualiza informações |
| Excluir usuário | `DELETE` | `/usuarios/{id}` | Remove usuário |

O token JWT retornado no login é armazenado no `localStorage` e incluído automaticamente nas requisições via `apiFetch()`.

---

## 📊 Recursos Visuais

### 📈 **Recharts**
Usado para exibir gráficos interativos em dashboards:
```tsx
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
```

### 🎯 **@hello-pangea/dnd**
Fornece arrastar e soltar (drag & drop) com suporte a acessibilidade:
```tsx
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
```

### 💎 **Lucide React**
Biblioteca moderna de ícones SVG:
```tsx
import { User, Settings } from "lucide-react";
```

---

## 🧰 Ferramentas de Desenvolvimento

- **Visual Studio Code** (recomendado)
- Extensões sugeridas:
  - *ESLint*
  - *Prettier*
  - *Tailwind CSS IntelliSense*
  - *React Developer Tools*

---

## 🧩 Contribuição

1. Crie uma nova branch:
   ```bash
   git checkout -b feature/nome-da-feature
   ```
2. Faça suas alterações.
3. Envie o PR para a branch `develop`.

---

## 🧠 Observação Importante

Caso o backend esteja rodando em uma porta diferente, atualize a variável `NEXT_PUBLIC_API_URL` no arquivo `.env.local`.

---

## 👨‍💻 Autor

**Projeto SEDEM — Mandatuum System**  
Desenvolvido por **Squad 20 (RiseUP)** — Residência de Software UNIT  
Contato: `squad20@unit.br`

---
