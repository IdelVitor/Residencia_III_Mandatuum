"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";  
import dash from "../dashboard/dashboard.module.css";
import styles from "./configuracoes.module.css";

// Import dos componentes das abas
import AlterarSenha from "./components/AlterarSenha";
import CadastroUsuario from "./components/CadastroUsuario";
import AdministracaoUsuarios from "./components/AdministracaoUsuarios";

export default function ConfiguracoesPage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  // Estado que controla a aba ativa
  const [abaAtiva, setAbaAtiva] = useState("senha");

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Ações", path: "/acoes" },
    { name: "Gestão de Tarefas", path: "/gestaoDeTarefas" },
    { name: "Financeiro", path: "/financeiro" },
    { name: "Eleições 2026", path: "/eleicao" },
    { name: "Configurações", path: "/configuracoes" },
  ];

  return (
    <div className={dash.shell}>
      {/* Sidebar lateral */}
      <aside className={dash.sidebar}>
        <div className={dash.menuTitle}>Menu Principal</div>

        <nav className={dash.nav}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`${dash.navItem} ${
                pathname === item.path ? dash.active : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
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

            {/* Tabs de navegação */}
            <div className={styles.tabs}>
              <span
                onClick={() => setAbaAtiva("senha")}
                className={`${styles.tab} ${
                  abaAtiva === "senha" ? styles.active : ""
                }`}
              >
                Alteração de Senha
              </span>

              <span
                onClick={() => setAbaAtiva("cadastro")}
                className={`${styles.tab} ${
                  abaAtiva === "cadastro" ? styles.active : ""
                }`}
              >
                Cadastro de Usuário
              </span>

              <span
                onClick={() => setAbaAtiva("admin")}
                className={`${styles.tab} ${
                  abaAtiva === "admin" ? styles.active : ""
                }`}
              >
                Administração de Usuários
              </span>
            </div>

            {/* Renderização condicional das seções */}
            {abaAtiva === "senha" && <AlterarSenha />}
            {abaAtiva === "cadastro" && <CadastroUsuario />}
            {abaAtiva === "admin" && <AdministracaoUsuarios />}
          </div>
        </main>
      </div>
    </div>
  );
}
