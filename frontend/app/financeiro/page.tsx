"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import dash from "../dashboard/dashboard.module.css";
import styles from "./financeiro.module.css";
import { useEffect, useState } from "react";
import { ChatWidget } from "../components/ChatWidget";

type RegistroUI = {
  data?: string | null;
  locacao: number;
  juridica: number;
  comunicacao: number;
  combustivel: number;
  debito: number;
  credito: number;
  outros: number;
  total: number;
};

const toNum = (v: any) => {
  const n = Number(v ?? 0);
  return Number.isFinite(n) ? n : 0;
};

const brl = (n: number) =>
  toNum(n).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const fmtData = (d?: string | null) => {
  if (!d) return "—";
  // tenta ISO; se falhar, mostra como string mesmo
  const t = Date.parse(d);
  return isNaN(t) ? d : new Date(t).toLocaleDateString("pt-BR");
};

// converte cada item do backend para o shape UI acima
const normalize = (it: any): RegistroUI => {
  const locacao      = toNum(it.valorLocacaoImovel ?? it.locacao);
  const juridica     = toNum(it.valorAssessoriaJuridica ?? it.juridica);
  const comunicacao  = toNum(it.valorAssessoriaComunicacao ?? it.comunicacao);
  const combustivel  = toNum(it.valorCombustivel ?? it.combustivel);
  const debito       = toNum(it.despesasDebito ?? it.debito);
  const credito      = toNum(it.despesasCredito ?? it.credito);
  const outros       = toNum(it.outrasDespesas ?? it.outros);

  const total = toNum(
    it.total ??
    locacao + juridica + comunicacao + combustivel + debito + credito + outros
  );

  const data =
    it.data ?? it.dataRegistro ?? it.criadoEm ?? it.createdAt ?? null;

  return { data, locacao, juridica, comunicacao, combustivel, debito, credito, outros, total };
};


export default function FinanceiroPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [registros, setRegistros] = useState<RegistroUI[]>([]);
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
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (token) headers.Authorization = `Bearer ${token}`;

        let res = await fetch(`${base}/registros-financeiros`, { headers });
        if (res.status === 404) res = await fetch(`${base}/financeiro/registros`, { headers });
        if (res.status === 404) res = await fetch(`${base}/registrosFinanceiros`, { headers });

        if (!res.ok) throw new Error(`GET registros -> ${res.status}`);
        const json = await res.json();
        const raw = Array.isArray(json) ? json : (json?.content ?? []);
        setRegistros(raw.map(normalize));
      } catch (e: any) {
        setError(e.message ?? "Erro ao carregar registros");
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

      {/* Conteúdo principal */}
      <div className={dash.main}>
        <main className={dash.content}>
          <div className={styles.container}>
            {/* Cabeçalho igual à Gestão de Tarefas */}
            <header className={styles.header}>
              <div className={styles.headerCenter}>
                <h1 className={styles.title}>Financeiro</h1>
                <p className={styles.subtitle}>
                  Organize e acompanhe o fluxo financeiro do sistema
                </p>
              </div>
              <button
                className={styles.newActionButton}
                onClick={() => router.push("/financeiro/novoRegistro")}
              >
                Novo Registro
              </button>
            </header>

            {/* Seção de Registros */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Registros Financeiros</h2>

              <div className={styles.tableWrapper}>
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
                    {registros.map((r, i) => (
                      <tr key={i}>
                        <td>{fmtData(r.data)}</td>
                        <td>{brl(r.locacao)}</td>
                        <td>{brl(r.juridica)}</td>
                        <td>{brl(r.comunicacao)}</td>
                        <td>{brl(r.combustivel)}</td>
                        <td>{brl(r.debito)}</td>
                        <td>{brl(r.credito)}</td>
                        <td>{brl(r.outros)}</td>
                        <td className={styles.total}>{brl(r.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <ChatWidget />
        </main>
      </div>
    </div>
  );
}
