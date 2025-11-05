"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import dash from "../dashboard/dashboard.module.css";
import styles from "./gestaoDeTarefas.module.css";
import { ChatWidget } from "../components/ChatWidget";

type Task = {
  id: number;
  titulo: string;
  descricao?: string;
  status: "ABERTA" | "EM_ANDAMENTO" | "CONCLUIDA";
};

type KanbanItem = { id: string; title: string; description?: string };
type Column = { name: string; color: string; items: KanbanItem[] };
type ColumnsState = {
  todo: Column;
  inProgress: Column;
  done: Column;
};

const STATUS_FROM_COLUMN: Record<keyof ColumnsState, Task["status"]> = {
  todo: "ABERTA",
  inProgress: "EM_ANDAMENTO",
  done: "CONCLUIDA",
};

export default function GestaoDeTarefas() {
  const router = useRouter();
  const pathname = usePathname();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  // 🔐 Proteção de rota
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  // 📋 Estado inicial vazio (será preenchido via fetch)
  const [columns, setColumns] = useState({
    todo: { name: "A Fazer", color: "#00E0FF", items: [] as any[] },
    inProgress: { name: "Em Andamento", color: "#C400FF", items: [] as any[] },
    done: { name: "Finalizado", color: "#6A8F2E", items: [] as any[] },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8082";
        const url = `${base}/tarefas/list`;
        console.log("➡️ GET", url);

        const res = await fetch(url);
        console.log("↩️ status", res.status);
        if (!res.ok) throw new Error(`GET /tarefas/list -> ${res.status}`);

        const data: Array<{
          id: number;
          titulo: string;
          descricao?: string;
          status: string;
        }> = await res.json();

        // mapeia
        const next = {
          todo: { name: "A Fazer", color: "#00E0FF", items: [] as any[] },
          inProgress: {
            name: "Em Andamento",
            color: "#C400FF",
            items: [] as any[],
          },
          done: { name: "Finalizado", color: "#6A8F2E", items: [] as any[] },
        };

        data.forEach((t: any) => {
          const item = {
            id: String(t.id),
            title: t.titulo ?? "(sem título)",
            description: t.descricao ?? "",
          };
          const s = String(t.status ?? "").toUpperCase();
          if (s === "ABERTA") next.todo.items.push(item);
          else if (s === "EM_ANDAMENTO") next.inProgress.items.push(item);
          else if (s === "CONCLUIDA") next.done.items.push(item);
          else next.todo.items.push(item); // fallback
        });

        console.log("✅ contagens:", {
          todo: next.todo.items.length,
          inProgress: next.inProgress.items.length,
          done: next.done.items.length,
        });

        setColumns(next);
      } catch (e: any) {
        console.error(e);
        setError(e?.message ?? "Erro ao carregar tarefas");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 🧲 DnD com update otimista + PATCH de status
  const onDragEnd = async (result: DropResult) => {
    if (!result?.destination) return;
    const { source, destination, draggableId } = result;

    // Atualiza visualmente (UI otimista)
    setColumns((prev) => {
      // deep copy simples
      const next: ColumnsState = {
        todo: { ...prev.todo, items: [...prev.todo.items] },
        inProgress: { ...prev.inProgress, items: [...prev.inProgress.items] },
        done: { ...prev.done, items: [...prev.done.items] },
      };

      const from = next[source.droppableId as keyof ColumnsState].items;
      const to = next[destination.droppableId as keyof ColumnsState].items;

      const [moved] = from.splice(source.index, 1);
      to.splice(destination.index, 0, moved);
      return next;
    });

    // Persistência de status quando muda de coluna
    if (source.droppableId !== destination.droppableId) {
      const newStatus =
        STATUS_FROM_COLUMN[destination.droppableId as keyof ColumnsState];

      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tarefas/${draggableId}/status`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
          }
        );
      } catch (err) {
        console.error("Falha ao atualizar status:", err);
        // Recarrega do backend para desfazer caso tenha dado erro
      }
    }
  };

  // ✅ Evita erro de hydration
  if (!isClient) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>Carregando…</div>
    );
  }

  const debugCounts = {
    todo: columns.todo.items.length,
    inProgress: columns.inProgress.items.length,
    done: columns.done.items.length,
  };

  return (
    <div className={dash.shell}>
      {/* Sidebar */}
      <aside className={dash.sidebar}>
        <div className={dash.menuTitle}>Menu Principal</div>
        <nav className={dash.nav}>
          {[
            { name: "Dashboard", path: "/dashboard" },
            { name: "Ações", path: "/acoes" },
            { name: "Gestão de Tarefas", path: "/gestaoDeTarefas" },
            { name: "Cadastro", path: "/cadastro" },
            { name: "Financeiro", path: "/financeiro" },
            { name: "Eleições 2026", path: "/eleicoes-2026" },
            { name: "Configurações", path: "/configuracoes" },
          ].map((item) => (
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

      {/* Área principal */}

      <div className={dash.main}>
        <main className={`${dash.content} ${styles.container}`}>
          <div className={styles.header}>
            <h1>Gestão de Tarefas</h1>
            <div style={{ margin: "8px 0", fontSize: 12, opacity: 0.7 }}>
              debug → A Fazer: {debugCounts.todo} • Em Andamento:{" "}
              {debugCounts.inProgress} • Finalizado: {debugCounts.done}
            </div>

            <p>Organize e acompanhe o processo das tarefas</p>
          </div>

          <div className={styles.topActions}>
            <button
              className={styles.newActionButton}
              onClick={() => router.push("/gestaoDeTarefas/novaTarefa")}
            >
              Nova Tarefa
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              Carregando tarefas…
            </div>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <section className={styles.columnsWrapper}>
                {(
                  Object.entries(columns) as Array<[keyof ColumnsState, Column]>
                ).map(([columnId, column]) => (
                  <div key={columnId} className={styles.column}>
                    <h3
                      className={styles.columnTitle}
                      style={{ background: column.color }}
                    >
                      {column.name}
                    </h3>

                    <Droppable droppableId={String(columnId)}>
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className={`${styles.droppableArea} ${
                            snapshot.isDraggingOver ? styles.draggingOver : ""
                          }`}
                        >
                          {column.items.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`${styles.taskBox} ${
                                    snapshot.isDragging ? styles.dragging : ""
                                  }`}
                                >
                                  <h4 className={styles.taskTitle}>
                                    {item.title}
                                  </h4>
                                  <p className={styles.taskDesc}>
                                    {item.description}
                                  </p>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))}
              </section>
            </DragDropContext>
          )}
          <div>
            <ChatWidget />
          </div>
        </main>
      </div>
    </div>
  );
}
