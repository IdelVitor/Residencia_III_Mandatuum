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

type Column = { name: string; color: string; items: any[] };
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

  const [columns, setColumns] = useState<ColumnsState>({
    todo: { name: "A Fazer", color: "#00C6FF", items: [] },
    inProgress: { name: "Em Andamento", color: "#7a34ff", items: [] },
    done: { name: "Finalizado", color: "#6dbb44", items: [] },
  });

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
        const res = await fetch(`${base}/tarefas/list`);
        if (!res.ok) throw new Error(`GET /tarefas/list -> ${res.status}`);

        const data: Task[] = await res.json();
        const next = {
          todo: { name: "A Fazer", color: "#00C6FF", items: [] as any[] },
          inProgress: {
            name: "Em Andamento",
            color: "#7a34ff",
            items: [] as any[],
          },
          done: { name: "Finalizado", color: "#6dbb44", items: [] as any[] },
        };

        data.forEach((t) => {
          const item = { id: String(t.id), title: t.titulo, description: t.descricao };
          if (t.status === "ABERTA") next.todo.items.push(item);
          else if (t.status === "EM_ANDAMENTO") next.inProgress.items.push(item);
          else next.done.items.push(item);
        });

        setColumns(next);
      } catch (e: any) {
        setError(e.message ?? "Erro ao carregar tarefas");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onDragEnd = async (result: DropResult) => {
    if (!result?.destination) return;
    const { source, destination, draggableId } = result;

    setColumns((prev) => {
      const next: ColumnsState = JSON.parse(JSON.stringify(prev));
      const from = next[source.droppableId as keyof ColumnsState].items;
      const to = next[destination.droppableId as keyof ColumnsState].items;
      const [moved] = from.splice(source.index, 1);
      to.splice(destination.index, 0, moved);
      return next;
    });

    if (source.droppableId !== destination.droppableId) {
      const newStatus =
        STATUS_FROM_COLUMN[destination.droppableId as keyof ColumnsState];
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tarefas/${draggableId}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
      } catch (err) {
        console.error("Erro ao atualizar status:", err);
      }
    }
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Ações", path: "/acoes" },
    { name: "Gestão de Tarefas", path: "/gestaoDeTarefas" },
    { name: "Cadastro", path: "/cadastro" },
    { name: "Financeiro", path: "/financeiro" },
    { name: "Eleições 2026", path: "/eleicoes-2026" },
    { name: "Configurações", path: "/configuracoes" },
  ];

  return (
    <div className={dash.shell}>
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

      <div className={dash.main}>
        <main className={`${dash.content} ${styles.container}`}>
          <header className={styles.header}>
            <div className={styles.headerCenter}>
              <h1 className={styles.title}>Gestão de Tarefas</h1>
                <p className={styles.subtitle}>
                  Organize e acompanhe o progresso das tarefas
                </p>
            </div>
            <button
              className={styles.newActionButton}
              onClick={() => router.push("/gestaoDeTarefas/novaTarefa")}
            >
              Nova Tarefa
            </button>
          </header>


          {loading ? (
            <p className={styles.loading}>Carregando tarefas...</p>
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <section className={styles.columnsWrapper}>
                {Object.entries(columns).map(([columnId, column]) => (
                  <div key={columnId} className={styles.column}>
                    <h3
                      className={styles.columnTitle}
                      style={{ background: column.color }}
                    >
                      {column.name}
                    </h3>
                    <Droppable droppableId={columnId}>
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
                                  className={`${styles.taskCard} ${
                                    snapshot.isDragging ? styles.dragging : ""
                                  }`}
                                >
                                  <h4 className={styles.taskTitle}>
                                    {item.title}
                                  </h4>
                                  <p className={styles.taskDesc}>
                                    {item.description || "Sem descrição"}
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
          <ChatWidget />
        </main>
      </div>
    </div>
  );
}
