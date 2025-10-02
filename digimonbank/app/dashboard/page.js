"use client";
import { useState } from "react";
import { getCurrentUser } from "../../lib/auth";
import TeamManager from "../../components/TeamManager";

export default function Dashboard() {
  const user = getCurrentUser();
  const [team, setTeam] = useState([]);
  const [mainPartner, setMainPartner] = useState(null);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Você precisa estar logado para acessar o Dashboard.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Bem-vindo, {user.get("username")}!
      </h1>
      <TeamManager 
        team={team} 
        setTeam={setTeam} 
        mainPartner={mainPartner} 
        setMainPartner={setMainPartner} 
      />
    </div>
  );
}
