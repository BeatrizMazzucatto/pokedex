import React, { useState } from "react";
import { PokeCard } from "./PokeCard";
import "./Pokedex.css";

type Pokemon = {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
  };
  types: Array<{
    type: { name: string };
  }>;
};

export default function Pokedex() {
  const [nome, setNome] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [erro, setErro] = useState("");

  const buscarPokemon = async () => {
    if (!nome.trim()) return;

    setCarregando(true);
    setErro("");
    setPokemon(null);

    try {
      const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`
      );
      if (!resposta.ok) throw new Error("Pokémon não encontrado");

      const dados: Pokemon = await resposta.json();
      setPokemon(dados);
    } catch (e) {
      setErro("Pokémon não encontrado 😢");
    } finally {
      setCarregando(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") buscarPokemon();
  };

  return (
    <div className="pokedex-container">
      <div className="pokedex-header">
        <div className="pokedex-logo">
          <span className="pokedex-logo__icon">🔴</span>
          <h1 className="pokedex-logo__titulo">Pokédex</h1>
        </div>
        <p className="pokedex-subtitulo">Busque qualquer Pokémon pelo nome</p>
      </div>

      <div className="pokedex-busca">
        <input
          className="pokedex-input"
          type="text"
          placeholder="Ex: pikachu, bulbasaur..."
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="pokedex-button"
          onClick={buscarPokemon}
          disabled={carregando}
        >
          {carregando ? "⏳" : "🔍 Buscar"}
        </button>
      </div>

      {carregando && (
        <div className="pokedex-loading">
          <div className="pokedex-loading__spinner"></div>
          <p>Carregando...</p>
        </div>
      )}

      {erro && <p className="pokedex-error">{erro}</p>}

      {pokemon && (
        <div className="pokedex-resultado">
          <PokeCard pokemon={pokemon} />
        </div>
      )}
    </div>
  );
}
