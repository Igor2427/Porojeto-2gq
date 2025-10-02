"use client";

import { useState } from "react";
import { getDigimon } from "../lib/digimonApi";

export default function DigimonPage() {
  const [query, setQuery] = useState("");
  const [digimon, setDigimon] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setDigimon(null);

    console.log("Query:", query);
    const data = await getDigimon(query);

    if (data) {
      console.log("Dados recebidos:", data);
      setDigimon(data);
    } else {
      setError("Digimon não encontrado");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Buscar Digimon</h1>
      
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Nome ou ID do Digimon"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded">
          Buscar
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {digimon && (
        <div className="border p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">{digimon.name}</h2>
          <img src={digimon.image} alt={digimon.name} className="mb-2 w-32 h-32" />
          <p><strong>Nível:</strong> {digimon.level}</p>
          <p><strong>Atributo:</strong> {digimon.attribute}</p>
        </div>
      )}
    </div>
  );
}
