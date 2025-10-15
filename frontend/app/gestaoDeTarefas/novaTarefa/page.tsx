"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./novaTarefa.module.css";

export default function NovaTarefa() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    datas: "",
    responsavel: "",
    prioridade: "",
    categorias: "",
    status: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tarefas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: form.titulo,
          descricao: form.descricao,
          datas: form.datas ? form.datas + "T00:00:00" : null,
          responsavel: form.responsavel,
          prioridade: form.prioridade.toUpperCase(),
          status: form.status.toUpperCase().replace(" ", "_"),
          categorias: form.categorias
            ? form.categorias.split(",").map((c) => c.trim())
            : [],
          usuario: { id: 1 },
        }),
      });

      if (!response.ok) throw new Error(`Erro ao salvar tarefa (${response.status})`);

      const data = await response.json();
      alert("✅ Tarefa cadastrada com sucesso!");
      console.log("Nova tarefa salva:", data);

      // Limpa o formulário
      setForm({
        titulo: "",
        descricao: "",
        datas: "",
        responsavel: "",
        prioridade: "",
        categorias: "",
        status: "",
      });

      // Redireciona de volta à tela principal
      router.push("/gestao-de-tarefas");
    } catch (err) {
      console.error(err);
      alert("❌ Ocorreu um erro ao cadastrar a tarefa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Cadastrar Nova Tarefa</h1>
        <p className={styles.subtitle}>
          Preencha as informações abaixo para registrar uma nova tarefa no sistema.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Título</label>
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            className={styles.input}
            placeholder="Ex: Atualizar planilha de gastos"
            required
          />

          <label className={styles.label}>Descrição</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Descreva brevemente a tarefa..."
          />

          <div className={styles.row}>
            <div className={styles.col}>
              <label className={styles.label}>Data</label>
              <input
                type="date"
                name="datas"
                value={form.datas}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.col}>
              <label className={styles.label}>Responsável</label>
              <input
                type="text"
                name="responsavel"
                value={form.responsavel}
                onChange={handleChange}
                className={styles.input}
                placeholder="Ex: João Silva"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.col}>
              <label className={styles.label}>Prioridade</label>
              <select
                name="prioridade"
                value={form.prioridade}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="">Selecione...</option>
                <option value="BAIXA">Baixa</option>
                <option value="MEDIA">Média</option>
                <option value="ALTA">Alta</option>
              </select>
            </div>
            <div className={styles.col}>
              <label className={styles.label}>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="">Selecione...</option>
                <option value="ABERTA">Aberta</option>
                <option value="EM_ANDAMENTO">Em andamento</option>
                <option value="CONCLUIDA">Concluída</option>
              </select>
            </div>
          </div>

          <label className={styles.label}>Categorias (separadas por vírgula)</label>
          <input
            type="text"
            name="categorias"
            value={form.categorias}
            onChange={handleChange}
            className={styles.input}
            placeholder="Ex: financeiro, administrativo"
          />

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
              onClick={() => router.push("/gestaoDeTarefas")}
            >
              Voltar
            </button>

            <button type="submit" className={styles.submit} disabled={loading}>
              {loading ? "Salvando..." : "Salvar Tarefa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
