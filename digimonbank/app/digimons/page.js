"use client";
import { useEffect, useState } from "react";
import { fetchDigimons } from "../../lib/digimonApi";
import DigimonCard from "../../components/DigimonCard";
import { getCurrentUser } from "../../lib/auth";

export default function Digimons() {
  const [digimons, setDigimons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchDigimons();
      if (data) setDigimons(data.content);
      setLoading(false);
    }
    load();
  }, []);

  const user = getCurrentUser();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Lista de Digimons</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {digimons.map(d => (
            <DigimonCard key={d.id} digimon={d} />
          ))}
        </div>
      )}
      {!user && (
        <p className="text-center text-gray-600 mt-6">
          Faça login para poder montar sua equipe!
        </p>
      )}
    </div>
  );
}
