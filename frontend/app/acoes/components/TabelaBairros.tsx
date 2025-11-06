"use client";
import { useEffect, useState } from "react";
import styles from "../acoes.module.css"; // importante para usar o estilo novo

interface DadosBairro {
  cidade: string;
  bairro: string;
  quantidade: number;
  percentual: string;
}

export default function TabelaBairros() {
  const [dados, setDados] = useState<DadosBairro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8082/acoes/por-cidade-bairro")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar dados");
        return res.json();
      })
      .then((data) => setDados(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className={styles.loading}>Carregando dados...</p>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Cidade</th>
            <th>Bairro</th>
            <th>Quantidade</th>
            <th>Percentual</th>
          </tr>
        </thead>
        <tbody>
          {dados.length === 0 ? (
            <tr>
              <td colSpan={4} className={styles.emptyRow}>
                Nenhum dado encontrado.
              </td>
            </tr>
          ) : (
            dados.map((item, index) => (
              <tr key={index}>
                <td>{item.cidade}</td>
                <td>{item.bairro}</td>
                <td>{item.quantidade}</td>
                <td>
                  <div className={styles.percentualCell}>
                    <span>{item.percentual}</span>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{
                          width: item.percentual,
                        }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
