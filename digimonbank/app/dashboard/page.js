"use client";

import { useState, useEffect } from "react";
import { getCurrentUser } from "../../lib/auth";
import TeamManager from "../../components/TeamManager";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // garantimos que estamos no cliente
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/"); // se não tiver logado, redireciona para login
    } else {
      setUser(currentUser);
    }
  }, [router]);

  if (!isClient || !user) {
    return null; // não renderiza nada até que seja cliente e user exista
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Bem-vindo, {user.get("username")}!
      </h1>
      <TeamManager user={user} />
    </div>
  );
}
