"use client";

import styles from "../acoes.module.css";

export default function TabelaBairros() {
  const dados = [
    { bairro: "Centro", qtd: 12, perc: "40%" },
    { bairro: "Siqueira Campos", qtd: 8, perc: "27%" },
    { bairro: "13 de Julho", qtd: 5, perc: "17%" },
    { bairro: "Santo Antônio", qtd: 3, perc: "10%" },
  ];

  return (
    <div className={styles.tabelaWrapper}>
      <h3>Pessoas por Bairro</h3>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Bairro</th>
            <th>Quantidade</th>
            <th>Percentual</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((d, i) => (
            <tr key={i}>
              <td>{d.bairro}</td>
              <td>{d.qtd}</td>
              <td>{d.perc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
