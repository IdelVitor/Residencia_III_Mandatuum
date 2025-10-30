"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link"; 
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
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
    { name: "Eleições 2026", path: "/eleicoes-2026" },
    { name: "Configurações", path: "/configuracoes" },
  ];

  // Dados de exemplo para os gráficos
  const statusData = [
    { name: "Concluídas", value: 60 },
    { name: "Em andamento", value: 25 },
    { name: "Atrasadas", value: 15 }
  ];

  const totalTasksData = [
    { name: "Tarefas Atrasadas", value: 20 },
    { name: "Tarefas Concluídas", value: 40 },
    { name: "Tarefas Pendentes", value: 40 },
  ];

  const tasksByResponsibleData = [
    { name: "Responsável 1", value: 25 },
    { name: "Responsável 2", value: 35 },
    { name: "Responsável 3", value: 40 },
  ];

  const avgDeadlineData = [
    { name: "Tarefa 1", deadline: 10 },
    { name: "Tarefa 2", deadline: 20 },
    { name: "Tarefa 3", deadline: 15 },
  ];

  return (
    <div className={styles.shell}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.menuTitle}>Menu Principal</div>

        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`${styles.navItem} ${
                pathname === item.path ? styles.active : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
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

        {/* Conteúdo principal */}
        <main className={styles.content}>
          {/* Introdução do Dashboard */}
          <section className={styles.pageIntro}>
            <h1 className={styles.h1}>Dashboard</h1>
            <p className={styles.subtitle}>
              Bem-vindo ao sistema de gerenciamento de ações
            </p>
          </section>

          {/* Cartões de Estatísticas */}
          <section className={styles.statistics}>
            <div className={styles.statCard}>
              <h3>Status de Tarefas</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                    <Cell fill="#4f46e5" />
                    <Cell fill="#6366f1" />
                    <Cell fill="#a78bfa" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className={styles.statCard}>
              <h3>Total de Tarefas</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={totalTasksData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className={styles.statCard}>
              <h3>Tarefas por Responsável</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={tasksByResponsibleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className={styles.statCard}>
              <h3>Prazo Médio</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={avgDeadlineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="deadline" fill="#a78bfa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
