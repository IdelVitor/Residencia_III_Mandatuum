"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import dash from "../dashboard/dashboard.module.css";
import styles from "./acoes.module.css";
import MapaAcoes from "./components/MapaAcoes";
import GraficosDistribuicao from "./components/GraficosDistribuicao";
import TabelaBairros from "./components/TabelaBairros";

export default function AcoesPage() {
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

      {/* Conteúdo principal */}
      <div className={dash.main}>
        <main className={`${dash.content} ${styles.container}`}>
          {/* Cabeçalho */}
          <div className={styles.header}>
            <h1>Ações</h1>
            <p>Visualize e gerencie as ações realizadas</p>
          </div>

          {/* Botão Nova Ação */}
          <div className={styles.topActions}>
            <button
              className={styles.newActionButton}
              onClick={() => router.push("/acoes/novaAcao")}
            >
              Nova Ação
            </button>
          </div>

          {/* Seções */}
          <section className={styles.section}>
            <h2 className={styles.cardTitle}>Mapa de Ações</h2>
            <MapaAcoes />
          </section>

          <section className={styles.section}>
            <h2 className={styles.cardTitle}>Distribuição</h2>
            <GraficosDistribuicao />
          </section>

          <section className={styles.section}>
            <h2 className={styles.cardTitle}>Ações por Bairro</h2>
            <TabelaBairros />
          </section>
        </main>
      </div>
    </div>
  );
}
