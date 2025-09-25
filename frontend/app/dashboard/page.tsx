"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const router = useRouter();

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
            <a className={`${styles.navItem} ${styles.active}`} href="#">
              Dashboard
            </a>
            <a className={styles.navItem} href="#">Ações</a>
            <a className={styles.navItem} href="#">Gestão de Tarefas</a>
            <a className={styles.navItem} href="#">Cadastro</a>
            <a className={styles.navItem} href="#">Financeiro</a>
            <a className={styles.navItem} href="#">Eleições 2026</a>
            <a className={styles.navItem} href="#">Configurações</a>
          </nav>

          <button className={styles.logout}>Sair</button>
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
