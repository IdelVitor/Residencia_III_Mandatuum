-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'MANAGER', 'USER');

-- CreateEnum
CREATE TYPE "public"."StatusTarefa" AS ENUM ('ABERTA', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "public"."Prioridade" AS ENUM ('BAIXA', 'MEDIA', 'ALTA', 'CRITICA');

-- CreateEnum
CREATE TYPE "public"."Sexo" AS ENUM ('M', 'F', 'OUTRO');

-- CreateTable
CREATE TABLE "public"."usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."contatos" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "nome_completo" TEXT NOT NULL,
    "idade" INTEGER,
    "sexo" "public"."Sexo",
    "email" TEXT,
    "celular" TEXT,
    "endereco" TEXT,
    "escolaridade" TEXT,
    "assessor" TEXT,
    "assunto" TEXT,
    "observacao" TEXT,
    "cidade" TEXT,
    "bairro" TEXT,
    "tag" TEXT,
    "tag_equipe" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contatos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."acoes" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "tipo" TEXT,
    "data" TIMESTAMP(3),
    "cidade" TEXT,
    "bairro" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,
    "contato_id" INTEGER,

    CONSTRAINT "acoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."coordenadas_bairros" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coordenadas_bairros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."registros_financeiros" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT,
    "tipo" TEXT NOT NULL,
    "categoria" TEXT,
    "valor" DECIMAL(12,2) NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registros_financeiros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_permissions" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "pagina" TEXT NOT NULL,
    "has_access" BOOLEAN NOT NULL DEFAULT false,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_access_logs" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "pagina_acessada" TEXT NOT NULL,
    "tipo_acesso" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_access_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tarefas" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "datas" TIMESTAMP(3),
    "responsavel" TEXT,
    "prioridade" "public"."Prioridade",
    "status" "public"."StatusTarefa" NOT NULL DEFAULT 'ABERTA',
    "categorias" TEXT[],
    "cidade" TEXT,
    "bairro" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "contato_id" INTEGER,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tarefas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "public"."usuarios"("email");

-- CreateIndex
CREATE INDEX "usuarios_nome_idx" ON "public"."usuarios"("nome");

-- CreateIndex
CREATE INDEX "contatos_usuario_id_idx" ON "public"."contatos"("usuario_id");

-- CreateIndex
CREATE INDEX "contatos_cidade_bairro_idx" ON "public"."contatos"("cidade", "bairro");

-- CreateIndex
CREATE INDEX "acoes_usuario_id_idx" ON "public"."acoes"("usuario_id");

-- CreateIndex
CREATE INDEX "acoes_contato_id_idx" ON "public"."acoes"("contato_id");

-- CreateIndex
CREATE INDEX "coordenadas_bairros_usuario_id_idx" ON "public"."coordenadas_bairros"("usuario_id");

-- CreateIndex
CREATE INDEX "coordenadas_bairros_cidade_bairro_idx" ON "public"."coordenadas_bairros"("cidade", "bairro");

-- CreateIndex
CREATE INDEX "registros_financeiros_usuario_id_data_idx" ON "public"."registros_financeiros"("usuario_id", "data");

-- CreateIndex
CREATE INDEX "user_permissions_usuario_id_idx" ON "public"."user_permissions"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_permissions_usuario_id_pagina_key" ON "public"."user_permissions"("usuario_id", "pagina");

-- CreateIndex
CREATE INDEX "user_access_logs_usuario_id_criado_em_idx" ON "public"."user_access_logs"("usuario_id", "criado_em");

-- CreateIndex
CREATE INDEX "tarefas_usuario_id_idx" ON "public"."tarefas"("usuario_id");

-- CreateIndex
CREATE INDEX "tarefas_contato_id_idx" ON "public"."tarefas"("contato_id");

-- CreateIndex
CREATE INDEX "tarefas_status_prioridade_idx" ON "public"."tarefas"("status", "prioridade");

-- AddForeignKey
ALTER TABLE "public"."contatos" ADD CONSTRAINT "contatos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."acoes" ADD CONSTRAINT "acoes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."acoes" ADD CONSTRAINT "acoes_contato_id_fkey" FOREIGN KEY ("contato_id") REFERENCES "public"."contatos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."coordenadas_bairros" ADD CONSTRAINT "coordenadas_bairros_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."registros_financeiros" ADD CONSTRAINT "registros_financeiros_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_permissions" ADD CONSTRAINT "user_permissions_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_access_logs" ADD CONSTRAINT "user_access_logs_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tarefas" ADD CONSTRAINT "tarefas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tarefas" ADD CONSTRAINT "tarefas_contato_id_fkey" FOREIGN KEY ("contato_id") REFERENCES "public"."contatos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
