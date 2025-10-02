"use client";

import { useState, useEffect } from "react";
import { signUp, login, logout, getCurrentUser } from "../lib/auth";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Só rodar no client
  useEffect(() => {
    setLoaded(true);
    const current = getCurrentUser();
    setUser(current);
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
    } else {
      setError(result.error);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  if (!loaded) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Minha App</h1>

      {user ? (
        <div className="text-center">
          <p className="mb-4">Bem-vindo, {user.get("username")}!</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Sair
          </button>
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
