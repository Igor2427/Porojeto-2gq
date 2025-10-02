"use client";

import React, { useState } from "react";

export default function TeamManager({ initialTeam = [] }) {
  const [team, setTeam] = useState(initialTeam);
  const [partner, setPartner] = useState(null);

  const addDigimon = (digimon) => {
    if (team.length >= 9) return alert("Máximo de 9 Digimons!");
    setTeam([...team, digimon]);
  };

  const removeDigimon = (digimonName) => {
    setTeam(team.filter(d => d.name !== digimonName));
    if (partner?.name === digimonName) setPartner(null);
  };

  const selectPartner = (digimon) => setPartner(digimon);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Sua Equipe</h2>
      <div className="grid grid-cols-3 gap-4">
        {team.map(d => (
          <div key={d.name} className="border p-2 relative">
            <p>{d.name}</p>
            <button
              onClick={() => removeDigimon(d.name)}
              className="absolute top-0 right-0 text-red-500 font-bold"
            >
              X
            </button>
            <button
              onClick={() => selectPartner(d)}
              className={`mt-1 px-2 py-1 text-white rounded ${
                partner?.name === d.name ? "bg-green-600" : "bg-blue-600"
              }`}
            >
              {partner?.name === d.name ? "Parceiro" : "Tornar Parceiro"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
