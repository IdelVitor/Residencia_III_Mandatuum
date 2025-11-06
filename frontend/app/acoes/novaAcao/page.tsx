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

      // Validação simples
      const titulo = form.titulo.trim();
      if (!titulo) {
          alert("Informe um título para a ação.");
          return;
      }

      setLoading(true);
      try {
          const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8082";

          // Token e ID do usuário
          const token =
              typeof window !== "undefined" ? localStorage.getItem("token") : null;
          let userId = 1;
          if (typeof window !== "undefined") {
              const stored = localStorage.getItem("userId");
              if (stored && !Number.isNaN(Number(stored))) userId = Number(stored);
          }

          const headers: Record<string, string> = {
              "Content-Type": "application/json",
          };
          if (token) headers.Authorization = `Bearer ${token}`;

          // Corpo da requisição (campos ajustados para o backend)
          const body = {
              titulo,
              descricao: form.descricao.trim() || null,
              tipo: form.tipo.trim() || null,
              data: form.data ? `${form.data}T00:00:00` : null,
              cidade: form.municipio.trim() || null, // campo correto no model
              bairro: form.bairro.trim() || null,
              usuario: { id: userId }, // ManyToOne obrigatório
          };

          const res = await fetch(`${base}/acoes`, {
              method: "POST",
              headers,
              body: JSON.stringify(body),
          });

          if (!res.ok) {
              const txt = await res.text().catch(() => "");
              console.error("POST /acoes FAILED:", res.status, txt);
              alert(`❌ Falha ao cadastrar (HTTP ${res.status}).\n${txt.substring(0, 400)}`);
              return;
          }

          // Sucesso → limpa o formulário e redireciona
          setForm({
              titulo: "",
              descricao: "",
              tipo: "",
              data: "",
              municipio: "",
              bairro: "",
              criarTarefa: "Não",
          });

          alert("Ação cadastrada com sucesso!");
          router.push("/acoes");
      } catch (err: any) {
          console.error(err);
          alert(`Erro inesperado: ${err?.message ?? err}`);
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
                <option value="Orlando Dantas">Orlando Dantas</option>
                <option value="Farolândia">Farolândia</option>
              </select>
            </div>
          </div>

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
