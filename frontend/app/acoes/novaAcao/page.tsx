"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./novaAcao.module.css";

export default function NovaAcao() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    tipo: "",
    data: "",
    municipio: "",
    bairro: "",
    criarTarefa: "Não",
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/acoes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: form.titulo,
          descricao: form.descricao,
          tipo: form.tipo,
          data: form.data ? form.data + "T00:00:00" : null,
          municipio: form.municipio,
          bairro: form.bairro,
          criarTarefa: form.criarTarefa === "Sim",
        }),
      });

      if (!response.ok)
        throw new Error(`Erro ao salvar ação (${response.status})`);

      const data = await response.json();
      alert("Ação cadastrada com sucesso!");
      console.log("Nova ação salva:", data);

      setForm({
        titulo: "",
        descricao: "",
        tipo: "",
        data: "",
        municipio: "",
        bairro: "",
        criarTarefa: "Não",
      });

      router.push("/acoes");
    } catch (err) {
      console.error(err);
      alert("❌ Ocorreu um erro ao cadastrar a ação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Cadastrar Nova Ação</h1>
        <p className={styles.subtitle}>
          Preencha as informações abaixo para registrar uma nova ação.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Título</label>
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            className={styles.input}
            placeholder="Ex: Campanha de vacinação"
            required
          />

          <label className={styles.label}>Descrição</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Descreva brevemente a ação..."
          />

          <div className={styles.row}>
            <div className={styles.col}>
              <label className={styles.label}>Tipo de Ação</label>
              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="">Selecione...</option>
                <option value="Campanha">Campanha</option>
                <option value="Evento">Evento</option>
                <option value="Reunião">Reunião</option>
              </select>
            </div>

            <div className={styles.col}>
              <label className={styles.label}>Data</label>
              <input
                type="date"
                name="data"
                value={form.data}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.col}>
              <label className={styles.label}>Município</label>
              <select
                name="municipio"
                value={form.municipio}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="">Selecione...</option>
                <option value="Aracaju">Aracaju</option>
                <option value="Nossa Senhora do Socorro">
                  Nossa Senhora do Socorro
                </option>
              </select>
            </div>

            <div className={styles.col}>
              <label className={styles.label}>Bairro</label>
              <select
                name="bairro"
                value={form.bairro}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="">Selecione...</option>
                <option value="Centro">Centro</option>
                <option value="Jardins">Jardins</option>
              </select>
            </div>
          </div>

          <label className={styles.label}>Criar Tarefa</label>
          <select
            name="criarTarefa"
            value={form.criarTarefa}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="Não">Não</option>
            <option value="Sim">Sim</option>
          </select>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
              onClick={() => router.push("/acoes")}
            >
              Cancelar
            </button>

            <button type="submit" className={styles.submit} disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
