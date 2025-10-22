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
    { name: "Cadastro", path: "/cadastro" },
    { name: "Financeiro", path: "/financeiro" },
    { name: "Eleições 2026", path: "/eleicoes-2026" },
    { name: "Configurações", path: "/configuracoes" },
  ];

  return (
    <div className={dash.shell}>
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

      <div className={dash.main}>
        <main className={dash.content}>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1>Ações</h1>
              <p>Visualize e gerencie as ações realizadas</p>
            </div>

            <div className={styles.topActions}>
              <button
                className={styles.newActionButton}
                onClick={() => router.push("/acoes/novaAcao")}
              >
                Nova Ação
              </button>
            </div>

            <h2 className={styles.sectionTitle}>Mapas de Ações</h2>
            <MapaAcoes />
            <GraficosDistribuicao />
            <TabelaBairros />
          </div>
        </main>
      </div>
    </div>
  );
}
