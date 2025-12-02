"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import styles from "./dashboard.module.css";
import { ChatWidget } from "../components/ChatWidget";

export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();

  // Estados para armazenar os dados do Backend
  const [dashboardData, setDashboardData] = useState({
    tasksByStatus: [],
    tasksByResponsible: []
  });
  const [isLoading, setIsLoading] = useState(true);

  // Paleta de cores para alternar nas barras dos Responsáveis
  const BAR_COLORS = [
    "#524bd8ff", // Roxo original
    "#4aca7bff", // Verde Claro
    "#fdbc3aff", // Amarelo
    "#fd7430ff", // Laranja
    "#0088FE", // Azulão
    "#00a889ff", // Verde Água
    "#bd8b20ff", // Dourado
    "#ff6b21ff"  // Coral
  ];

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Ações", path: "/acoes" },
    { name: "Gestão de Tarefas", path: "/gestaoDeTarefas" },
    { name: "Financeiro", path: "/financeiro" },
    { name: "Eleições 2026", path: "/eleicao" },
    { name: "Configurações", path: "/configuracoes" },
  ];

  // Busca os dados ao carregar a página
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        // Porta ajustada para 8082 conforme seu backend
        const response = await fetch("http://localhost:8082/tarefas/dashboard", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDashboardData({
            tasksByStatus: data.tasksByStatus || [],
            tasksByResponsible: data.tasksByResponsible || [],
          });
        } else {
          console.error("Erro ao buscar dados do dashboard:", response.status);
        }
      } catch (error) {
        console.error("Erro de conexão com o backend:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  // Função auxiliar para definir cores baseado no nome do Status
  const getStatusColor = (statusName: string) => {
    // Normaliza para maiúsculo para evitar erros de case
    const name = statusName ? statusName.toUpperCase() : "";
    
    if (name.includes("CONCLU")) return "var(--concluidas)"; // Verde (defina no CSS)
    if (name.includes("PENDENTE") || name.includes("ANDAMENTO")) return "var(--pendentes)"; // Amarelo
    if (name.includes("ATRAS")) return "var(--atrasadas)"; // Vermelho
    
    // --- CORREÇÃO: Cor específica para ABERTA ---
    if (name.includes("ABERTA")) return "#f87171"; // Azul forte
    
    return "#8884d8"; // Cor padrão caso não ache
  };

  if (isLoading) {
    return (
      <div className={styles.shell}>
        <div className={styles.main} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>Carregando dados do dashboard...</p>
        </div>
      </div>
    );
  }

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

        <main className={styles.content}>
          <section className={styles.pageIntro}>
            <h1 className={styles.h1}>Dashboard</h1>
            <p className={styles.subtitle}>
              Bem-vindo ao sistema de gerenciamento de ações
            </p>
          </section>

          {/* Gráficos */}
          <section className={styles.statistics}>

            {/* Status de Tarefas */}
            <div className={styles.statCard}>
              <h3>Status de Tarefas</h3>
              {dashboardData.tasksByStatus.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Legend verticalAlign="bottom" height={36} />
                    <Tooltip formatter={(value, name) => [`${value}`, `${name}`]}/>
                    <Pie
                      data={dashboardData.tasksByStatus}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="40%"
                      outerRadius={80}
                    >
                      {dashboardData.tasksByStatus.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={getStatusColor(entry.name)} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p style={{ textAlign: "center", padding: "20px" }}>Nenhuma tarefa encontrada.</p>
              )}
            </div>

            {/* Resumo Geral (Gráfico de Barras usando dados de status) */}
            <div className={styles.statCard}>
              <h3>Resumo Geral</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dashboardData.tasksByStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip cursor={{ fill: "transparent" }} />
                  <Bar dataKey="value">
                    {dashboardData.tasksByStatus.map((entry: any, index: number) => (
                         <Cell key={`bar-${index}`} fill={getStatusColor(entry.name)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Tarefas por Responsável - COM CORES ALTERNADAS */}
            <div className={styles.statCard}>
              <h3>Tarefas por Responsável</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dashboardData.tasksByResponsible}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip cursor={{ fill: "transparent" }} />
                  
                  {/* Usa a paleta BAR_COLORS com index % length para rotacionar as cores */}
                  <Bar dataKey="value" name="Quantidade">
                    {dashboardData.tasksByResponsible.map((entry: any, index: number) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={BAR_COLORS[index % BAR_COLORS.length]} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
          </section>

          <ChatWidget />
        </main>
      </div>
    </div>
  );
}