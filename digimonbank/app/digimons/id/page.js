"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../../lib/auth";
import { getDigimonList } from "../../lib/digimonApi";  // Corrigido para a função correta

export default function DigimonsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [digimons, setDigimons] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const current = getCurrentUser();
    setUser(current);

    if (current) {
      getDigimonList().then((data) => {
        if (data) {
          setDigimons(data);
        }
      });
    }
  }, []);

  const handleDigimonSelect = (digimon) => {
    router.push(`/digimon/${digimon.id || digimon.name}`);
  };

  if (!loaded) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Escolha um Digimon</h1>

      {user ? (
        <div className="text-center">
          <p className="mb-4">Bem-vindo, {user.get("username")}!</p>

          <div className="mt-6">
            <div className="grid grid-cols-3 gap-4">
              {digimons.map((digimon) => (
                <div
                  key={digimon.id}
                  className="cursor-pointer border p-4 rounded-lg shadow-md hover:bg-blue-100"
                  onClick={() => handleDigimonSelect(digimon)}
                >
                  <img
                    src={digimon.image}
                    alt={digimon.name}
                    className="w-20 h-20 mx-auto mb-2"
                  />
                  <p className="text-center">{digimon.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
