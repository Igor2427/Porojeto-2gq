"use client";

import { useState, useEffect } from "react";
import { signUp, login, getCurrentUser, logout } from "../lib/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  // Pega usuário atual ao carregar
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  // Função de submit (login ou registro)
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
      router.push("/dashboard");
    } else {
      setError(result.error);
    }
  };

  // Logout
  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-blue-500">
      <h1 className="text-3xl font-bold mb-6">Digimon Bank</h1>

      {user ? (
        <div className="text-center">
          <p className="mb-4">Bem-vindo, {user.get("username")}!</p>
          <button
            onClick={() => router.push("/digimons")}
            className="bg-yellow-400 px-4 py-2 rounded mr-2"
          >
            Ver Digimons
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-green-400 px-4 py-2 rounded mr-2"
          >
            Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-400 px-4 py-2 rounded"
          >
            Logout
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
