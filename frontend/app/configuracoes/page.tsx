"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dash from "../dashboard/dashboard.module.css";
import styles from "./configuracoes.module.css";

import AlterarSenha from "./components/AlterarSenha";
import CadastroUsuario from "./components/CadastroUsuario";
import AdministracaoUsuarios from "./components/AdministracaoUsuarios";

export default function ConfiguracoesPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  // controla a aba ativa
  const [abaAtiva, setAbaAtiva] = useState("senha");

  return (
    <div className={dash.shell}>
      {/* Sidebar lateral fixa */}
      <aside className={dash.sidebar}>
        <div className={dash.menuTitle}>Menu Principal</div>
        <nav className={dash.nav}>
          <a href="/dashboard" className={dash.navItem}>Dashboard</a>
          <a href="/acoes" className={dash.navItem}>Ações</a>
          <a href="/acoes" className={dash.navItem}>Gestão de Tarefas</a>
          <a href="#" className={dash.navItem}>Cadastro</a>
          <a href="#" className={dash.navItem}>Financeiro</a>
          <a href="#" className={dash.navItem}>Eleições 2026</a>
          <a href="/configuracoes" className={`${dash.navItem} ${dash.active}`}>
            Configurações
          </a>
        </nav>

        <button
          className={dash.logout}
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        >
          Sair
        </button>
      </aside>

      {/* Área principal */}
      <div className={dash.main}>
        <main className={dash.content}>
          <div className={styles.container}>
            {/* Cabeçalho */}
            <div className={styles.header}>
              <h1>Configurações</h1>
              <p>Gerencie suas configurações de usuário</p>
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
              <span
                onClick={() => setAbaAtiva("senha")}
                className={`${styles.tab} ${abaAtiva === "senha" ? styles.active : ""}`}
              >
                Alteração de Senha
              </span>
              <span
                onClick={() => setAbaAtiva("cadastro")}
                className={`${styles.tab} ${abaAtiva === "cadastro" ? styles.active : ""}`}
              >
                Cadastro de Usuário
              </span>
              <span
                onClick={() => setAbaAtiva("admin")}
                className={`${styles.tab} ${abaAtiva === "admin" ? styles.active : ""}`}
              >
                Administração de Usuários
              </span>
            </div>

            {/* Renderização condicional */}
            {abaAtiva === "senha" && <AlterarSenha />}
            {abaAtiva === "cadastro" && <CadastroUsuario />}
            {abaAtiva === "admin" && <AdministracaoUsuarios />}
          </div>
        </main>
      </div>
    </div>
  );
}
