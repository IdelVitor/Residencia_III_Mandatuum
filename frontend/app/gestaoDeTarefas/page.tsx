"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import dash from "../dashboard/dashboard.module.css";
import styles from "./gestaoDeTarefas.module.css";

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

  // 📋 Estado inicial das tarefas
  const [columns, setColumns] = useState({
    todo: {
      name: "A Fazer",
      color: "#00E0FF",
      items: [
        { id: "1", title: "Reunião com cliente", description: "Alinhar backlog e prazos" },
        { id: "2", title: "Criar wireframe", description: "Layout da tela de login" },
      ],
    },
    inProgress: {
      name: "Em Andamento",
      color: "#C400FF",
      items: [{ id: "3", title: "Implementar Dashboard", description: "Front-end com React" }],
    },
    done: {
      name: "Finalizado",
      color: "#6A8F2E",
      items: [{ id: "4", title: "Configurar ambiente", description: "Docker + Banco rodando" }],
    },
  });

  const onDragEnd = (result: any) => {
    if (!result?.destination) return;
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: { ...column, items: copiedItems },
      });
    } else {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
        [destination.droppableId]: { ...destColumn, items: destItems },
      });
    }
  };

  // ✅ Evita o erro de hydration
  if (!isClient) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Carregando...</div>;
  }

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
          {/* 🔹 Cabeçalho centralizado (igual à página Configurações) */}
          <div className={styles.header}>
            <h1>Gestão de Tarefas</h1>
            <p>Organize e acompanhe o processo das tarefas</p>
          </div>

          {/* 🔹 Botão Nova Tarefa */}
          <div className={styles.topActions}>
            <button
              className={styles.newActionButton}
              onClick={() => router.push("/gestaoDeTarefas/novaTarefa")}
            >
              Nova Tarefa
            </button>
          </div>

          {/* 🔹 Colunas de tarefas com Drag and Drop */}
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
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`${styles.taskBox} ${
                                  snapshot.isDragging ? styles.dragging : ""
                                }`}
                              >
                                <h4 className={styles.taskTitle}>{item.title}</h4>
                                <p className={styles.taskDesc}>{item.description}</p>
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
        </main>
      </div>
    </div>
  );
}
