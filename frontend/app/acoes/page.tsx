"use client";

import styles from "./acoes.module.css";
import MapView from "./MapViewLeaflet";

export default function AcoesPage() {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.menuTitle}>Menu Principal</div>
        <nav className={styles.nav}>
          <a className={styles.navItem} href="/dashboard">Dashboard</a>
          <a className={`${styles.navItem} ${styles.active}`} href="/acoes">Ações</a>
          <a className={styles.navItem} href="#">Gestão de Tarefas</a>
          <a className={styles.navItem} href="#">Cadastro</a>
          <a className={styles.navItem} href="#">Financeiro</a>
          <a className={styles.navItem} href="#">Eleições 2026</a>
          <a className={styles.navItem} href="#">Configurações</a>
        </nav>
        <button className={styles.logout}>Sair</button>
      </aside>

      <div className={styles.main}>
        <header className={styles.topbar}>
          <div>
            <div className={styles.brand}>Ações</div>
            <div className={styles.subtitleTop}>Visualize e gerencie as ações realizadas</div>
          </div>
          <div className={styles.topRight}>Olá, XXX</div>
        </header>

        <main className={styles.content}>
          <h1 className={styles.h1}>Mapas de Ações</h1>

          <div className={styles.tabs}>
            <button className={`${styles.tab} ${styles.tabActive}`}>Pontos Individuais</button>
            <button className={styles.tab}>Contadores por Bairro</button>
            <button className={styles.tab}>Mapa de Calor</button>
          </div>

          <section className={styles.mapCard}>
            <MapView />
          </section>
        </main>
      </div>
    </div>
  );
}
