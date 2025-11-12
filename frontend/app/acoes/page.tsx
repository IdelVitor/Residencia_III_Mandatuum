"use client";

import {useEffect, useState} from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import dash from "../dashboard/dashboard.module.css";
import styles from "./acoes.module.css";
import MapaAcoes from "./components/MapaAcoes";
import GraficosDistribuicao from "./components/GraficosDistribuicao";
import TabelaBairros from "./components/TabelaBairros";

type Acao = {
    id: number;
    titulo: string;
    descricao?: string;
    tipo?: string;
    data?: string;        // ISO (yyyy-MM-ddTHH:mm:ss)
    cidade?: string;
    bairro?: string;
};

export default function AcoesPage() {
  const router = useRouter();
  const pathname = usePathname();

    // estado
    const [acoes, setAcoes] = useState<Acao[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

// carregar do backend
    useEffect(() => {
        (async () => {
            try {
                const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8082";
                const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

                const headers: Record<string, string> = { "Content-Type": "application/json" };
                if (token) headers.Authorization = `Bearer ${token}`;

                // tenta primeiro o DTO leve (/acoes/list); se não existir, cai para /acoes
                let res = await fetch(`${base}/acoes/list`, { headers });
                if (res.status === 404) res = await fetch(`${base}/acoes`, { headers });

                if (!res.ok) throw new Error(`GET /acoes -> ${res.status}`);
                const json = await res.json();
                const data: Acao[] = Array.isArray(json) ? json : (json?.content ?? []);

                setAcoes(data);
            } catch (e: any) {
                setError(e.message ?? "Erro ao carregar ações");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

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

            <h2 className={styles.cardTitle}>Mapas de Ações</h2>
            <MapaAcoes />
              <h2 className={styles.cardTitle} style={{ marginTop: "2rem" }}>
                  Ações cadastradas
              </h2>

              {loading && <div style={{ padding: 12 }}>Carregando ações…</div>}
              {error && <div style={{ color: "crimson", padding: 12 }}>Erro: {error}</div>}

              <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                  {acoes.map(a => (
                      <div key={a.id} className={styles.card}>
                          <h3 style={{ margin: 0 }}>{a.titulo}</h3>
                          {a.descricao && <p style={{ marginTop: 6 }}>{a.descricao}</p>}
                          <div style={{ fontSize: 12, opacity: .8, marginTop: 6 }}>
                              {[a.tipo, (a.data ? new Date(a.data).toLocaleDateString() : null), [a.bairro, a.cidade].filter(Boolean).join(", ")]
                                  .filter(Boolean)
                                  .join(" • ")}
                          </div>
                      </div>
                  ))}
                  {!loading && !error && acoes.length === 0 && (
                      <div style={{ opacity: .7 }}>Nenhuma ação cadastrada ainda.</div>
                  )}
              </div>
              <GraficosDistribuicao />
            <TabelaBairros />
          </div>
        </main>
      </div>
    </div>
  );
}
