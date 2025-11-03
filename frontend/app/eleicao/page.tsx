"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import dash from "../dashboard/dashboard.module.css";
import { useState, useMemo } from "react";
import tabela from "./tabela.module.css"; 

type ResultadoBairro = {
  bairro: string;
  percentual: number;
  votos: number;
};

const dadosIniciais: ResultadoBairro[] = [
  { bairro: "SALGADO FILHO", percentual: 2.86, votos: 124 },
  { bairro: "GRAGERU", percentual: 2.67, votos: 43 },
  { bairro: "ARUANA", percentual: 2.89, votos: 12 },
  { bairro: "CENTRO", percentual: 1.5, votos: 25 },
  { bairro: "13 DE JULHO", percentual: 3.1, votos: 55 },
  { bairro: "JARDINS", percentual: 2.95, votos: 88 },
];
// ---------------------------------

export default function EleicaoPage() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Ações", path: "/acoes" },
    { name: "Gestão de Tarefas", path: "/gestaoDeTarefas" },
    { name: "Financeiro", path: "/financeiro" },
    { name: "Eleições 2026", path: "/eleicao" },
    { name: "Configurações", path: "/configuracoes" },
  ];

  const [busca, setBusca] = useState("");

  const dadosFiltrados = useMemo(() => {
    const buscaLower = busca.toLowerCase();
    if (!buscaLower) return dadosIniciais;

    return dadosIniciais.filter((item) =>
      item.bairro.toLowerCase().includes(buscaLower)
    );
  }, [busca]);

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

            <table className={tabela.tabela}>
              <thead className={tabela.thead}>
                <tr>
                  <th className={tabela.th}>BAIRRO</th>
                  <th className={tabela.th}>PERCENTUAL (%)</th>
                  <th className={tabela.th}>VOTOS ABSOLUTOS</th>
                </tr>
              </thead>
              <tbody>
                {dadosFiltrados.map((item) => (
                  <tr key={item.bairro}>
                    <td className={tabela.td}>{item.bairro}</td>
                    <td className={tabela.td}>{item.percentual.toFixed(2)}%</td>
                    <td className={tabela.td}>{item.votos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}