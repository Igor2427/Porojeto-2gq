"use client";

import { useState } from "react";
import { getDigimon } from "../lib/digimonApi";

export default function DigimonPage() {
  const [query, setQuery] = useState("");
  const [digimon, setDigimon] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    const data = await getDigimon(query);
    if (data) {
      setDigimon(data);
    } else {
      setDigimon(null);
      setError("Digimon não encontrado");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Buscar Digimon</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Digite nome ou ID"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {digimon && (
        <div className="border p-4 rounded shadow w-80 text-center">
          <h2 className="text-xl font-bold">{digimon.name}</h2>
          <p>Nível: {digimon.level}</p>
          <p>Atributo: {digimon.attribute}</p>
          {digimon.image && <img src={digimon.image} alt={digimon.name} className="mt-2 mx-auto" />}
        </div>
      )}
    </div>
  );
}
