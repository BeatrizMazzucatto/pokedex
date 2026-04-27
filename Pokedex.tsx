import React, { useState } from "react";
import { PokeCard } from "./PokeCard";
import "./Pokedex.css";
import { fetchPokemon, Pokemon } from "./services/api";
export default function PokedexScreen() {
  const [nome, setNome] = useState("");
  // Exercício 1: Estado de carregamento e erro
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  // Exercício 1: Busca Inicial ("busca inicial de dados não informa ao usuário o que está acontecendo e pode falhar silenciosamente")
  React.useEffect(() => {
    const carregarInicial = async () => {
      setIsLoading(true);
      setErro("");
      try {
        const dados = await fetchPokemon("pikachu");
        setPokemon(dados);
      } catch (error) {
        setErro("Falha ao carregar Pokémons. Verifique sua conexão.");
      } finally {
        setIsLoading(false);
      }
    };
    carregarInicial();
  }, []);

  const buscarPokemon = async () => {
    if (!nome.trim()) return;

    // Exercício 1: Indicador de carregamento
    setIsLoading(true);
    setErro("");
    setPokemon(null);

    // Exercício 1: try/catch para tratamento de erros na api
    try {
      const dados = await fetchPokemon(nome);
      setPokemon(dados);
    } catch {
      // Exercício 1: Mensagem de erro amigável
      setErro("Falha ao carregar Pokémons. Verifique sua conexão.");
    } finally {
      // Exercício 1: Finaliza o carregamento
      setIsLoading(false);
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
          disabled={isLoading}
        />
        <button
          className="pokedex-button"
          onClick={buscarPokemon}
          disabled={isLoading}
        >
          {isLoading ? "⏳" : "🔍 Buscar"}
        </button>
      </div>

      {/* Exercício 1: Indicador de carregamento */}
      {isLoading && (
        <div className="pokedex-loading">
          <div className="pokedex-loading__spinner"></div>
          <p>Carregando Pokémons…</p>
        </div>
      )}

      {/* Exercício 1: Mensagem de erro amigável */}
      {erro && <p className="pokedex-error">{erro}</p>}

      {pokemon && (
        <div className="pokedex-resultado">
          <PokeCard pokemon={pokemon} />
        </div>
      )}
    </div>
  );
}
