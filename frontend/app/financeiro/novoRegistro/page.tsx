"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import dash from "../../dashboard/dashboard.module.css";
import styles from "./novoRegistro.module.css";
import { useEffect, useState } from "react";
import { ChatWidget } from "../../components/ChatWidget";

type FormState = {
  dataRegistro: string; // yyyy-MM-dd
  valorLocacaoImovel: string;
  valorAssessoriaJuridica: string;
  valorAssessoriaComunicacao: string;
  valorCombustivel: string;
  despesasDebito: string;
  despesasCredito: string;
  outrasDespesas: string;
};

export default function NovoRegistroFinanceiro() {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>({
    dataRegistro: "",
    valorLocacaoImovel: "",
    valorAssessoriaJuridica: "",
    valorAssessoriaComunicacao: "",
    valorCombustivel: "",
    despesasDebito: "",
    despesasCredito: "",
    outrasDespesas: "",
  });

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

  const onChange =
    (name: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [name]: e.target.value }));
    };

  const toNumber = (s: string) => {
    if (!s) return 0;
    // aceita "1.234,56" ou "1234.56"
    const norm = s.replace(/\./g, "").replace(",", ".");
    const n = Number(norm);
    return Number.isFinite(n) ? n : 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação mínima
    if (!form.dataRegistro) {
      alert("Informe a data do registro.");
      return;
    }

    const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8082";
    const token = localStorage.getItem("token") ?? "";

    let userId = 1;
    const stored = localStorage.getItem("userId");
    if (stored && !Number.isNaN(Number(stored))) userId = Number(stored);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    // Monte o payload com os nomes do SEU model:
    // Se no seu RegistroFinanceiro.java os nomes forem outros (ex.: data, locacaoImovel, etc.),
    // ajuste aqui mantendo a lógica de números e a inclusão do usuário.
    const payload = {
      dataRegistro: form.dataRegistro || null,
      valorLocacaoImovel: toNumber(form.valorLocacaoImovel),
      valorAssessoriaJuridica: toNumber(form.valorAssessoriaJuridica),
      valorAssessoriaComunicacao: toNumber(form.valorAssessoriaComunicacao),
      valorCombustivel: toNumber(form.valorCombustivel),
      despesasDebito: toNumber(form.despesasDebito),
      despesasCredito: toNumber(form.despesasCredito),
      outrasDespesas: toNumber(form.outrasDespesas),
      usuarioId: userId,
    };

    setLoading(true);
    try {
      // rota principal
      let res = await fetch(`${base}/registros-financeiros`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      // fallbacks de rota comuns
      if (res.status === 404) {
        res = await fetch(`${base}/financeiro/registros`, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });
      }
      if (res.status === 404) {
        res = await fetch(`${base}/registrosFinanceiros`, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        console.error("POST registro financeiro FAILED:", res.status, txt);
        alert(
          `❌ Falha ao cadastrar (HTTP ${res.status}).\n${txt.substring(
            0,
            400
          )}`
        );
        return;
      }

      // Sucesso
      setForm({
        dataRegistro: "",
        valorLocacaoImovel: "",
        valorAssessoriaJuridica: "",
        valorAssessoriaComunicacao: "",
        valorCombustivel: "",
        despesasDebito: "",
        despesasCredito: "",
        outrasDespesas: "",
      });
      alert("✅ Registro financeiro cadastrado com sucesso!");
      router.push("/financeiro");
    } catch (err: any) {
      console.error(err);
      alert(`❌ Erro inesperado: ${err?.message ?? err}`);
    } finally {
      setLoading(false);
    }
  };

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
        <main className={`${dash.content} ${styles.container}`}>
          <div className={styles.header}>
            <h1>Novo Registro Financeiro</h1>
            <button className={styles.exportButton}>Exportar</button>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <label>
                Data de Registro
                <input
                  type="date"
                  name="dataRegistro"
                  value={form.dataRegistro}
                  onChange={onChange("dataRegistro")}
                  required
                />
              </label>

              <label>
                Valor da Locação do Imóvel
                <input
                  type="text"
                  name="valorLocacaoImovel"
                  placeholder="R$"
                  value={form.valorLocacaoImovel}
                  onChange={onChange("valorLocacaoImovel")}
                />
              </label>

              <label>
                Valor da Assessoria Jurídica
                <input
                  type="text"
                  name="valorAssessoriaJuridica"
                  placeholder="R$"
                  value={form.valorAssessoriaJuridica}
                  onChange={onChange("valorAssessoriaJuridica")}
                />
              </label>

              <label>
                Valor da Assessoria de Comunicação
                <input
                  type="text"
                  name="valorAssessoriaComunicacao"
                  placeholder="R$"
                  value={form.valorAssessoriaComunicacao}
                  onChange={onChange("valorAssessoriaComunicacao")}
                />
              </label>

              <label>
                Valor do Combustível
                <input
                  type="text"
                  name="valorCombustivel"
                  placeholder="R$"
                  value={form.valorCombustivel}
                  onChange={onChange("valorCombustivel")}
                />
              </label>

              <label>
                Despesas no Débito
                <input
                  type="text"
                  name="despesasDebito"
                  placeholder="R$"
                  value={form.despesasDebito}
                  onChange={onChange("despesasDebito")}
                />
              </label>

              <label>
                Despesas no Crédito
                <input
                  type="text"
                  name="despesasCredito"
                  placeholder="R$"
                  value={form.despesasCredito}
                  onChange={onChange("despesasCredito")}
                />
              </label>

              <label>
                Outras Despesas
                <input
                  type="text"
                  name="outrasDespesas"
                  placeholder="R$"
                  value={form.outrasDespesas}
                  onChange={onChange("outrasDespesas")}
                />
              </label>
            </div>

            <div className={styles.buttons}>
              <button
                type="submit"
                className={styles.saveButton}
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar Informações"}
              </button>
              <button
                type="button"
                className={styles.backButton}
                onClick={() => router.push("/financeiro")}
              >
                Voltar
              </button>
            </div>
          </form>
          <div>
            <ChatWidget />
          </div>
        </main>
      </div>
    </div>
  );
}
