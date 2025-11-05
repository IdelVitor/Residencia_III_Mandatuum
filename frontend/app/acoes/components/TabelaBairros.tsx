"use client";
import { useEffect, useState } from "react";

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
    return <p className="text-center text-gray-500">Carregando dados...</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mt-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-purple-700 text-white">
              <th className="p-3 text-left rounded-tl-lg">Cidade</th>
              <th className="p-3 text-left">Bairro</th>
              <th className="p-3 text-left">Quantidade</th>
              <th className="p-3 text-left rounded-tr-lg">Percentual</th>
            </tr>
          </thead>
          <tbody>
            {dados.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  Nenhum dado encontrado.
                </td>
              </tr>
            ) : (
              dados.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3">{item.cidade}</td>
                  <td className="p-3">{item.bairro}</td>
                  <td className="p-3">{item.quantidade}</td>
                  <td className="p-3">{item.percentual}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
