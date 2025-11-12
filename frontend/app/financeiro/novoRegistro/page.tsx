"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import dash from "../../dashboard/dashboard.module.css";
import styles from "./novoRegistro.module.css";
import { useEffect } from "react";
import { ChatWidget } from "../../components/ChatWidget";

export default function NovoRegistroFinanceiro() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Registro salvo com sucesso!");
    router.push("/financeiro");
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
                <input type="date" required />
              </label>

              <label>
                Valor da Locação do Imóvel
                <input type="number" placeholder="R$" />
              </label>

              <label>
                Valor da Assessoria Jurídica
                <input type="number" placeholder="R$" />
              </label>

              <label>
                Valor da Assessoria de Comunicação
                <input type="number" placeholder="R$" />
              </label>

              <label>
                Valor do Combustível
                <input type="number" placeholder="R$" />
              </label>

              <label>
                Despesas no Débito
                <input type="number" placeholder="R$" />
              </label>

              <label>
                Despesas no Crédito
                <input type="number" placeholder="R$" />
              </label>

              <label>
                Outras Despesas
                <input type="number" placeholder="R$" />
              </label>
            </div>

            <div className={styles.buttons}>
              <button type="submit" className={styles.saveButton}>
                Salvar Informações
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
