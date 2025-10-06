"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname(); // pega a rota atual

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className={styles.shell}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.menuTitle}>Menu Principal</div>

        <nav className={styles.nav}>
          <a
            href="/dashboard"
            className={`${styles.navItem} ${
              pathname === "/dashboard" ? styles.active : ""
            }`}
          >
            Dashboard
          </a>

          <a
            href="#"
            className={`${styles.navItem} ${
              pathname === "/acoes" ? styles.active : ""
            }`}
          >
            Ações
          </a>

          <a
            href="/acoes"
            className={`${styles.navItem} ${
              pathname === "/acoes" ? styles.active : ""
            }`}
          >
            Gestão de Tarefas
          </a>

          <a href="#" className={styles.navItem}>
            Cadastro
          </a>
          <a href="#" className={styles.navItem}>
            Financeiro
          </a>
          <a href="#" className={styles.navItem}>
            Eleições 2026
          </a>
          <a href="#" className={styles.navItem}>
            Configurações
          </a>
        </nav>

        <button
          className={styles.logout}
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        >
          Sair
        </button>
      </aside>

      {/* Área principal */}
      <div className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.brand}>Vereador XXX</div>
          <div className={styles.topRight}>Olá, XXX</div>
        </header>

        <main className={styles.content}>
          <section className={styles.pageIntro}>
            <h1 className={styles.h1}>Dashboard</h1>
            <p className={styles.subtitle}>
              Bem-vindo ao sistema de gerenciamento de ações
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
