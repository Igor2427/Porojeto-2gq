// /lib/digimonApi.js

const BASE_URL = "https://digi-api.com/api/v1";

// Buscar lista de Digimons
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
