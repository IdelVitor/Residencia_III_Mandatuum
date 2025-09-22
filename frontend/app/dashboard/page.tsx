// frontend/app/dashboard/page.tsx
import styles from "./dashboard.module.css";

export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div className={styles.shell}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.menuTitle}>Menu Principal</div>
        <nav className={styles.nav}>
          <a className={`${styles.navItem} ${styles.active}`} href="#">Dashboard</a>
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
        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.brand}>Vereador XXX</div>
          <div className={styles.topRight}>Olá, XXX</div>
        </header>

        {/* Conteúdo */}
        <main className={styles.content}>
          <section className={styles.pageIntro}>
            <h1 className={styles.h1}>Dashboard</h1>
            <p className={styles.subtitle}>
              Bem-vindo ao sistema de gerenciamento de ações
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>Estatísticas de Gestão das Ações</h2>

            <div className={styles.cards}>
              {/* Card 1 */}
              <article className={styles.card}>
                <div className={styles.cardHead}>Status de Tarefas</div>
                <div className={`${styles.chart} ${styles.donut}`} aria-hidden="true">
                  <svg viewBox="0 0 120 120" aria-hidden="true">
                    <circle cx="60" cy="60" r="40" className={styles.sliceBg} />
                    <circle cx="60" cy="60" r="40" className={styles.slice1}
                            strokeDasharray="75 251.2" />
                    <circle cx="60" cy="60" r="40" className={styles.slice2}
                            strokeDasharray="50 251.2" strokeDashoffset={-75} />
                    <circle cx="60" cy="60" r="40" className={styles.slice3}
                            strokeDasharray="30 251.2" strokeDashoffset={-125} />
                  </svg>
                </div>
                <div className={styles.cardFoot}>
                  <div className={styles.metricTitle}>Total de Tarefas</div>
                  <a className={styles.link} href="#">X</a>
                </div>
              </article>

              {/* Card 2 */}
              <article className={styles.card}>
                <div className={styles.cardHead}>Tarefas por Responsável</div>
                <div className={`${styles.chart} ${styles.bars}`} aria-hidden="true">
                  <div className={styles.barGroup}>
                    <div className={`${styles.bar} ${styles.barA}`} />
                    <div className={`${styles.bar} ${styles.barB}`} />
                  </div>
                  <div className={styles.barGroup}>
                    <div className={`${styles.bar} ${styles.barA}`} />
                    <div className={`${styles.bar} ${styles.barB}`} />
                  </div>
                </div>
                <div className={styles.cardFoot}>
                  <div className={styles.metricTitle}>Tarefas Concluídas</div>
                  <a className={styles.link} href="#">X</a>
                </div>
              </article>

              {/* Card 3 */}
              <article className={styles.card}>
                <div className={styles.cardHead}>Progresso de Tarefas</div>
                <div className={`${styles.chart} ${styles.bars}`} aria-hidden="true">
                  <div className={styles.barGroup}>
                    <div className={`${styles.bar} ${styles.barA}`} />
                    <div className={`${styles.bar} ${styles.barB}`} />
                  </div>
                  <div className={styles.barGroup}>
                    <div className={`${styles.bar} ${styles.barA}`} />
                    <div className={`${styles.bar} ${styles.barB}`} />
                  </div>
                </div>
                <div className={styles.cardFoot}>
                  <div className={styles.metricTitle}>Prazo Médio</div>
                  <a className={styles.link} href="#">X</a>
                </div>
              </article>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
