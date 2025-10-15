-- =========================
-- Tabela: usuarios
-- =========================
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- Tabela: contatos
-- =========================
CREATE TABLE IF NOT EXISTS contatos (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome_completo VARCHAR(255) NOT NULL,
    idade INT,
    sexo VARCHAR(20),
    email VARCHAR(255),
    celular VARCHAR(20),
    endereco VARCHAR(255),
    escolaridade VARCHAR(100),
    assessor VARCHAR(100),
    assunto VARCHAR(255),
    observacao TEXT,
    cidade VARCHAR(100),
    bairro VARCHAR(100),
    tag VARCHAR(100),
    tag_equipe VARCHAR(100),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_contato_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- =========================
-- Tabela: acoes
-- =========================
CREATE TABLE IF NOT EXISTS acoes (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    contato_id INT,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(100),
    data TIMESTAMP,
    cidade VARCHAR(100),
    bairro VARCHAR(100),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_acao_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_acao_contato FOREIGN KEY (contato_id) REFERENCES contatos(id) ON DELETE SET NULL
);

-- =========================
-- Tabela: coordenadas_bairros
-- =========================
CREATE TABLE IF NOT EXISTS coordenadas_bairros (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_coordenada_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- =========================
-- Tabela: registros_financeiros
-- =========================
CREATE TABLE IF NOT EXISTS registros_financeiros (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    data DATE NOT NULL,
    descricao TEXT,
    tipo VARCHAR(50) NOT NULL,
    categoria VARCHAR(100),
    valor NUMERIC(12,2) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_registro_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- =========================
-- Tabela: user_permissions
-- =========================
CREATE TABLE IF NOT EXISTS user_permissions (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    pagina VARCHAR(255) NOT NULL,
    has_access BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_permission_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT unq_usuario_pagina UNIQUE (usuario_id, pagina)
);

-- =========================
-- Tabela: user_access_logs
-- =========================
CREATE TABLE IF NOT EXISTS user_access_logs (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    pagina_acessada VARCHAR(255) NOT NULL,
    tipo_acesso VARCHAR(50),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_accesslog_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- =========================
-- Tabela: tarefas
-- =========================
CREATE TABLE IF NOT EXISTS tarefas (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    contato_id INT,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    datas TIMESTAMP,
    responsavel VARCHAR(255),
    prioridade VARCHAR(50),
    status VARCHAR(50) DEFAULT 'ABERTA',
    categorias TEXT[], -- array de categorias
    cidade VARCHAR(100),
    bairro VARCHAR(100),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tarefa_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_tarefa_contato FOREIGN KEY (contato_id) REFERENCES contatos(id) ON DELETE SET NULL
);
