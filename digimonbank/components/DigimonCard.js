"use client";

import React from "react";

export default function DigimonCard({ digimon }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <img src={digimon.img} alt={digimon.name} className="w-32 h-32 mx-auto" />
      <h2 className="text-center font-bold mt-2">{digimon.name}</h2>
      <p className="text-center text-sm">{digimon.level}</p>
    </div>
  );
}
