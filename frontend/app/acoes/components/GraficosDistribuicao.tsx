"use client";

import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const dataGenero = [
  { name: "Masculino", value: 60 },
  { name: "Feminino", value: 40 },
];
const COLORS = ["#5e0ef1", "#f22ee4"];

const dataIdade = [
  { faixa: "18-24", qtd: 4 },
  { faixa: "25-34", qtd: 8 },
  { faixa: "35-44", qtd: 3 },
  { faixa: "45-54", qtd: 1 },
  { faixa: "55+", qtd: 2 },
];

export default function GraficosDistribuicao() {
  return (
    <div style={{ display: "flex", gap: "3rem", marginTop: "2rem", flexWrap: "wrap" }}>
      {/* Gráfico de gênero */}
      <div style={{ flex: 1, minWidth: 300, textAlign: "center" }}>
        <h3>Distribuição por Sexo</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={dataGenero} dataKey="value" nameKey="name" outerRadius={90}>
              {dataGenero.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de idade */}
      <div style={{ flex: 1, minWidth: 300, textAlign: "center" }}>
        <h3>Distribuição por Idade</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dataIdade}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="faixa" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="qtd" fill="#5e0ef1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
