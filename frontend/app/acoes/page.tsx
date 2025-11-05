"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import dash from "../dashboard/dashboard.module.css";
import styles from "./acoes.module.css";

import MapaAcoes from "./components/MapaAcoes";
import TabelaBairros from "./components/TabelaBairros";

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

  // Autenticação
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  // Carregar do backend
  useEffect(() => {
    (async () => {
      try {
        const base =
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8082";
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null;

        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (token) headers.Authorization = `Bearer ${token}`;

        let res = await fetch(`${base}/acoes/list`, { headers });
        if (res.status === 404) res = await fetch(`${base}/acoes`, { headers });
        if (!res.ok) throw new Error(`GET /acoes -> ${res.status}`);

        const json = await res.json();
        const data: Acao[] = Array.isArray(json)
          ? json
          : json?.content ?? [];

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

      {/* Conteúdo */}
      <div className={dash.main}>
        <main className={dash.content}>
          <div className={styles.container}>
            {/* Cabeçalho */}
            <div className={styles.headerRow}>
              <div>
                <h1 className={styles.title}>Ações</h1>
                <p className={styles.subtitle}>
                  Visualize e gerencie as ações realizadas
                </p>
              </div>
              <div className={styles.actionsRight}>
                <button
                  className={styles.newActionButton}
                  onClick={() => router.push("/acoes/novaAcao")}
                >
                  Nova Ação
                </button>
              </div>
            </div>

            {/* Mapa de Ações */}
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Mapa de Ações</h2>
              <div className={styles.cardBody}>
                <MapaAcoes />
              </div>
            </section>

            {/* Pessoas por Bairro */}
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Pessoas por Bairro</h2>
              <div className={styles.cardBody}>
                <TabelaBairros />
              </div>
            </section>

            {/* Ações cadastradas */}
            <section className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Ações cadastradas</h2>
              {!loading && !error && acoes.length > 0 && (
                <span className={styles.badge}>{acoes.length}</span>
              )}
            </section>

            {loading && (
              <div className={styles.actionsGrid}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={`${styles.card} ${styles.skeleton}`} />
                ))}
              </div>
            )}

            {error && <div className={styles.errorBox}>Erro: {error}</div>}

            {!loading && !error && (
              <>
                {acoes.length === 0 ? (
                  <div className={styles.emptyState}>
                    Nenhuma ação cadastrada ainda.
                  </div>
                ) : (
                  <div className={styles.actionsGrid}>
                    {acoes.map((a) => {
                      const dateStr = a.data
                        ? new Date(a.data).toLocaleDateString("pt-BR")
                        : null;
                      const local = [a.bairro, a.cidade]
                        .filter(Boolean)
                        .join(", ");

                      return (
                        <div key={a.id} className={styles.card}>
                          <div className={styles.cardBody}>
                            <h3 className={styles.actionTitle}>{a.titulo}</h3>

                            {a.descricao && (
                              <p className={styles.actionDesc}>{a.descricao}</p>
                            )}

                            <div className={styles.metaRow}>
                              {a.tipo && (
                                <span className={styles.metaPill}>
                                  {a.tipo}
                                </span>
                              )}
                              {dateStr && (
                                <span className={styles.metaItem}>
                                  📅 {dateStr}
                                </span>
                              )}
                              {local && (
                                <span className={styles.metaItem}>
                                  📍 {local}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
  