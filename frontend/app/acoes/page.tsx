"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import dash from "../dashboard/dashboard.module.css";
import styles from "./acoes.module.css";

import MapaAcoes from "./components/MapaAcoes";
import TabelaBairros from "./components/TabelaBairros";
import { ChatWidget } from "../components/ChatWidget";

type Acao = {
  id: number;
  titulo: string;
  descricao?: string;
  tipo?: string;
  data?: string;
  cidade?: string;
  bairro?: string;
};

export default function AcoesPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [acoes, setAcoes] = useState<Acao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  useEffect(() => {
    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8082";
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;

        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (token) headers.Authorization = `Bearer ${token}`;

        let res = await fetch(`${base}/acoes/list`, { headers });
        if (res.status === 404) res = await fetch(`${base}/acoes`, { headers });
        if (!res.ok) throw new Error(`GET /acoes -> ${res.status}`);

        const json = await res.json();
        const data: Acao[] = Array.isArray(json) ? json : json?.content ?? [];

        setAcoes(data);
      } catch (e: any) {
        setError(e.message ?? "Erro ao carregar ações");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
            <header className={styles.header}>
              <div className={styles.headerCenter}>
                <h1 className={styles.title}>Ações</h1>
                  <p className={styles.subtitle}>
                    Acompanhe, visualize e gerencie todas as ações realizadas 
                  </p>
              </div>
              <button
                className={styles.newActionButton}
                onClick={() => router.push("/acoes/novaAcao")}
              >
                Nova Ação
              </button>
            </header>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Mapa de Ações</h2>
              <div className={styles.mapWrapper}>
                <MapaAcoes />
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Ações Cadastradas</h2>
              {loading ? (
                <p className={styles.loading}>Carregando...</p>
              ) : error ? (
                <p className={styles.error}>Erro: {error}</p>
              ) : acoes.length === 0 ? (
                <p className={styles.emptyState}>Nenhuma ação cadastrada.</p>
              ) : (
                <div className={styles.cardsGrid}>
                  {acoes.map((acao) => {
                    const dateStr = acao.data
                      ? new Date(acao.data).toLocaleDateString("pt-BR")
                      : "Sem data";
                    const local = [acao.bairro, acao.cidade]
                      .filter(Boolean)
                      .join(", ");

                    return (
                      <div key={acao.id} className={styles.card}>
                        <h3 className={styles.cardTitle}>{acao.titulo}</h3>
                        {acao.descricao && (
                          <p className={styles.cardDesc}>{acao.descricao}</p>
                        )}
                        <div className={styles.meta}>
                          <span>📍 {local || "Local não informado"}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Pessoas por Bairro</h2>
              <div className={styles.tableWrapper}>
                <TabelaBairros />
              </div>
            </section>
          </div>

          <ChatWidget />
        </main>
      </div>
    </div>
  );
}
