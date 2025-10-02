// /lib/digimonApi.js

const BASE_URL = "https://digi-api.com/api/v1";

// Buscar lista de Digimons
export async function getDigimon(nameOrId) {
  try {
    const res = await fetch(`https://digi-api.com/api/v1/digimon/${nameOrId}`);
    if (!res.ok) throw new Error("Digimon não encontrado");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erro ao buscar Digimon:", err.message);
    return null;
  }
}


export async function fetchDigimons(page = 0) {
  try {
    const res = await fetch(`${BASE_URL}/digimon?page=${page}`);
    if (!res.ok) throw new Error("Erro ao buscar Digimons");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Buscar detalhes de um Digimon específico
export async function fetchDigimonById(id) {
  try {
    const res = await fetch(`${BASE_URL}/digimon/${id}`);
    if (!res.ok) throw new Error("Erro ao buscar Digimon");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// lib/digimonApi.js

// Buscar um Digimon pelo nome ou ID
export async function getDigimon(nameOrId) {
  try {
    const res = await fetch(`https://digi-api.com/api/v1/digimon/${nameOrId}`, {
      cache: "no-store", // evita cache de SSR
    });

    if (!res.ok) throw new Error("Digimon não encontrado");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erro ao buscar Digimon:", err.message);
    return null;
  }
}

// Buscar lista de Digimons
export async function getDigimonList(page = 1, pageSize = 20) {
  try {
    const res = await fetch(
      `https://digi-api.com/api/v1/digimon?page=${page}&pageSize=${pageSize}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Não foi possível buscar a lista de Digimons");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erro ao buscar lista de Digimons:", err.message);
    return [];
  }
}
