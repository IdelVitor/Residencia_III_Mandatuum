"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import dash from "../dashboard/dashboard.module.css";
import styles from "./financeiro.module.css";
import { useEffect } from "react";

export default function FinanceiroPage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Ações", path: "/acoes" },
    { name: "Gestão de Tarefas", path: "/gestaoDeTarefas" },
    { name: "Cadastro", path: "/cadastro" },
    { name: "Financeiro", path: "/financeiro" },
    { name: "Eleições 2026", path: "/eleicoes-2026" },
    { name: "Configurações", path: "/configuracoes" },
  ];

  const registros = [
    {
      data: "02/07/2025",
      locacao: 40000,
      juridica: 20000,
      comunicacao: 3000,
      combustivel: 2000,
      debito: 0,
      credito: 0,
      outros: 0,
      total: 65000,
    },
    {
      data: "01/07/2025",
      locacao: 3000,
      juridica: 3000,
      comunicacao: 4000,
      combustivel: 2000,
      debito: 1000,
      credito: 0,
      outros: 0,
      total: 13000,
    },
  ];

  return (
    <div className={dash.shell}>
      {/* Sidebar */}
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

      {/* Conteúdo principal */}
      <div className={dash.main}>
        <header className={dash.topbar}>
          <div className={dash.brand}>Financeiro</div>
          <div className={dash.topRight}>Olá, XXX</div>
        </header>

        <main className={`${dash.content} ${styles.container}`}>
          <div className={styles.header}>
            <h1>Registros Financeiros</h1>
            <button
              className={styles.newButton}
              onClick={() => router.push("/financeiro/novoRegistro")}
            >
              Novo Registro
            </button>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>DATA</th>
                <th>LOCAÇÃO</th>
                <th>ASS. JURÍDICA</th>
                <th>ASS. COMUNICAÇÃO</th>
                <th>COMBUSTÍVEL</th>
                <th>DÉBITO</th>
                <th>CRÉDITO</th>
                <th>OUTROS</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((item, index) => (
                <tr key={index}>
                  <td>{item.data}</td>
                  <td>R$ {item.locacao.toLocaleString()}</td>
                  <td>R$ {item.juridica.toLocaleString()}</td>
                  <td>R$ {item.comunicacao.toLocaleString()}</td>
                  <td>R$ {item.combustivel.toLocaleString()}</td>
                  <td>R$ {item.debito.toLocaleString()}</td>
                  <td>R$ {item.credito.toLocaleString()}</td>
                  <td>R$ {item.outros.toLocaleString()}</td>
                  <td>R$ {item.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
