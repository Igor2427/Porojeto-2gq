"use client";

import { useState, useEffect } from "react";
import { signUp, login, logout, getCurrentUser } from "../lib/auth";
import { getDigimonList } from "../lib/digimonApi";  // Corrigido o import

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [digimons, setDigimons] = useState([]);  // Estado para armazenar os Digimons
  const [selectedDigimon, setSelectedDigimon] = useState(null);  // Digimon escolhido

  // Só rodar no client
  useEffect(() => {
    setLoaded(true);
    const current = getCurrentUser();
    setUser(current);

    // Buscar Digimons após o login
    if (current) {
      getDigimonList()
        .then((data) => {
          if (data) {
            setDigimons(data);  // Armazenar os Digimons recebidos
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar Digimons:", error);
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    let result;
    if (isRegister) {
      result = await signUp(username, password);
    } else {
      result = await login(username, password);
    }

    if (result.success) {
      setUser(result.user);
      // Após login, buscar Digimons
      getDigimonList()
        .then((data) => {
          if (data) {
            setDigimons(data);
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar Digimons:", error);
        });
    } else {
      setError(result.error);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setDigimons([]);  // Limpar a lista de Digimons ao sair
    setSelectedDigimon(null);
  };

  const handleDigimonSelect = (digimon) => {
    setSelectedDigimon(digimon);  // Definir o Digimon selecionado
  };

  if (!loaded) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Minha App</h1>

      {user ? (
        <div className="text-center w-full max-w-4xl">
          <p className="mb-4">Bem-vindo, {user.get("username")}!</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded mb-6"
          >
            Sair
          </button>

          {/* Exibir Digimons se o usuário estiver logado */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Escolha um Digimon</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {digimons.map((digimon) => (
                <div
                  key={digimon.id || digimon.name}
                  className="cursor-pointer border p-4 rounded-lg shadow-md hover:bg-blue-100"
                  onClick={() => handleDigimonSelect(digimon)}
                >
                  <img
                    src={digimon.image}
                    alt={digimon.name}
                    className="w-20 h-20 mx-auto mb-2 object-contain"
                  />
                  <p className="text-center">{digimon.name}</p>
                </div>
              ))}
            </div>

            {/* Mostrar o Digimon selecionado */}
            {selectedDigimon && (
              <div className="mt-6 border p-4 rounded shadow-lg max-w-sm mx-auto">
                <h3 className="text-lg font-bold mb-2">{selectedDigimon.name}</h3>
                <img
                  src={selectedDigimon.image}
                  alt={selectedDigimon.name}
                  className="w-32 h-32 mx-auto mb-2 object-contain"
                />
                <p><strong>Nível:</strong> {selectedDigimon.level || "N/A"}</p>
                <p><strong>Atributo:</strong> {selectedDigimon.attribute || "N/A"}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-80"
        >
          <h2 className="text-xl font-semibold mb-4">
            {isRegister ? "Registrar" : "Login"}
          </h2>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white w-full p-2 rounded mb-2"
          >
            {isRegister ? "Registrar" : "Entrar"}
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm text-gray-600 underline"
          >
            {isRegister ? "Já tem conta? Entrar" : "Não tem conta? Registrar"}
          </button>
        </form>
      )}
    </div>
  );
}
