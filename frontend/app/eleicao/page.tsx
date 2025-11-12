"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import dash from "../dashboard/dashboard.module.css";
import { useState, useMemo, useEffect } from "react";
import tabela from "./tabela.module.css";
import { ChatWidget } from "../components/ChatWidget";

type ResultadoBairro = {
  bairro: string;
  percentual: number;
  votos: number;
};

export default function EleicaoPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [resultados, setResultados] = useState<ResultadoBairro[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Ações", path: "/acoes" },
    { name: "Gestão de Tarefas", path: "/gestaoDeTarefas" },
    { name: "Financeiro", path: "/financeiro" },
    { name: "Eleições 2026", path: "/eleicao" },
    { name: "Configurações", path: "/configuracoes" },
  ];

  useEffect(() => {
    async function fetchVotos() {
      try {
        setIsLoading(true);
        setError(null);

        const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8082";
        const token = localStorage.getItem("token");
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetch(`${base}/acoes`, { headers });
        if (!res.ok) {
          throw new Error(`Falha ao buscar ações: ${res.status}`);
        }

        const acoes: any[] = await res.json();

        const contagemVotos: Record<string, number> = {};
        let totalVotos = 0;

        for (const acao of acoes) {
          if (acao.bairro && acao.bairro.trim() !== "") {
            const bairroUpper = acao.bairro.toUpperCase();
            contagemVotos[bairroUpper] = (contagemVotos[bairroUpper] || 0) + 1;
            totalVotos++;
          }
        }

        const dadosFormatados = Object.entries(contagemVotos).map(
          ([bairro, votos]) => {
            const percentual = totalVotos > 0 ? (votos / totalVotos) * 100 : 0;
            return {
              bairro: bairro,
              votos: votos,
              percentual: percentual,
            };
          }
        );
        setResultados(dadosFormatados);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Erro ao carregar dados.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchVotos();
  }, []);

  const [busca, setBusca] = useState("");

  const dadosFiltrados = useMemo(() => {
    const buscaLower = busca.toLowerCase();
    if (!buscaLower) return resultados;

    return resultados.filter((item) =>
      item.bairro.toLowerCase().includes(buscaLower)
    );
  }, [busca, resultados]);

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
          <div className={tabela.container}>
            <h1 className={tabela.titulo}>Resultados por Bairro</h1>

            <div className={tabela.buscaContainer}>
              <input
                type="text"
                placeholder="Buscar bairro"
                className={tabela.buscaInput}
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            {isLoading && <p>Carregando resultados...</p>}

            {error && <p style={{ color: "red" }}>{error}</p>}

            {!isLoading && !error && (
              <table className={tabela.tabela}>
                <thead className={tabela.thead}>
                  <tr>
                    <th className={tabela.th}>BAIRRO</th>
                    <th className={tabela.th}>PERCENTUAL (%)</th>
                    <th className={tabela.th}>VOTOS ABSOLUTOS</th>
                  </tr>
                </thead>
                <tbody>
                  {dadosFiltrados.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        style={{ textAlign: "center", padding: "1rem" }}
                      >
                        Nenhum resultado encontrado.
                      </td>
                    </tr>
                  )}
                  {dadosFiltrados.map((item) => (
                    <tr key={item.bairro}>
                      <td className={tabela.td}>{item.bairro}</td>
                      <td className={tabela.td}>
                        {item.percentual.toFixed(2)}%
                      </td>
                      <td className={tabela.td}>{item.votos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <ChatWidget />
        </main>
      </div>
    </div>
  );
}
