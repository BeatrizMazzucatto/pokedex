import { useState, useEffect, useMemo } from "react";
import { PokeCard } from "./PokeCard";
import type { Pokemon } from "./services/api";
import { fetchPokemon, fetchPokemonsIniciais } from "./services/api";

export default function PokedexScreen() {
  const [busca, setBusca] = useState("");
  const [inputBusca, setInputBusca] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [carregamentoInicial, setCarregamentoInicial] = useState(true);

  // Carregamento inicial da lista
  useEffect(() => {
    const carregarIniciais = async () => {
      setIsLoading(true);
      setErro("");
      try {
        const dados = await fetchPokemonsIniciais();
        setPokemons(dados);
      } catch {
        setErro("Falha ao carregar Pokémons. Verifique sua conexão.");
      } finally {
        setIsLoading(false);
        setCarregamentoInicial(false);
      }
    };
    carregarIniciais();
  }, []);

  // Exercício 2: Filtragem da lista pelo termo de busca (filtro local)
  const pokemonsFiltrados = useMemo(() => {
    if (!busca.trim()) return pokemons;
    return pokemons.filter((p) =>
      p.name.toLowerCase().includes(busca.toLowerCase().trim())
    );
  }, [pokemons, busca]);

  const buscarPokemon = async () => {
    const termo = inputBusca.trim();
    if (!termo) {
      setBusca("");
      return;
    }

    // Primeiro filtra localmente
    const encontradoLocal = pokemons.some((p) =>
      p.name.toLowerCase() === termo.toLowerCase()
    );

    if (encontradoLocal) {
      setBusca(termo);
      return;
    }

    // Se não encontrou localmente, busca na API e adiciona à lista
    setIsLoading(true);
    setErro("");
    try {
      const dados = await fetchPokemon(termo);
      setPokemons((prev) => {
        const jaExiste = prev.some((p) => p.name === dados.name);
        return jaExiste ? prev : [dados, ...prev];
      });
      setBusca(termo);
    } catch {
      setBusca(termo); // Aplica busca mesmo sem resultado para mostrar empty state
      setErro(`Pokémon "${termo}" não encontrado na PokéAPI.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") buscarPokemon();
  };

  const limparBusca = () => {
    setInputBusca("");
    setBusca("");
    setErro("");
  };

  // Exercício 2: Componente de lista vazia (equivalente ao ListEmptyComponent da FlatList)
  const ListEmptyComponent = () => {
    if (isLoading) return null;

    if (busca.trim() && pokemonsFiltrados.length === 0) {
      return (
        <div className="pokedex-empty">
          <span className="pokedex-empty__icon">🔍</span>
          <p className="pokedex-empty__titulo">Nenhum Pokémon encontrado</p>
          <p className="pokedex-empty__subtitulo">
            Nenhum Pokémon encontrado para <strong>"{busca}"</strong>
          </p>
          <button className="pokedex-empty__botao" onClick={limparBusca}>
            Limpar busca
          </button>
        </div>
      );
    }

    if (!carregamentoInicial && pokemons.length === 0) {
      return (
        <div className="pokedex-empty">
          <span className="pokedex-empty__icon">😴</span>
          <p className="pokedex-empty__titulo">Lista vazia</p>
          <p className="pokedex-empty__subtitulo">
            Nenhum Pokémon para exibir no momento.
          </p>
        </div>
      );
    }

    return null;
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
          value={inputBusca}
          onChange={(e) => setInputBusca(e.target.value)}
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
        {busca && (
          <button className="pokedex-button pokedex-button--secondary" onClick={limparBusca}>
            ✕
          </button>
        )}
      </div>

      {/* Indicador de busca ativa */}
      {busca && !isLoading && (
        <div className="pokedex-filtro-ativo">
          Filtrando por: <strong>"{busca}"</strong> —{" "}
          {pokemonsFiltrados.length} resultado{pokemonsFiltrados.length !== 1 ? "s" : ""}
        </div>
      )}

      {/* Spinner de carregamento */}
      {isLoading && (
        <div className="pokedex-loading">
          <div className="pokedex-loading__spinner"></div>
          <p>Carregando Pokémons…</p>
        </div>
      )}

      {/* Mensagem de erro (não bloqueia a lista) */}
      {erro && <p className="pokedex-error">{erro}</p>}

      {/* Exercício 2: Lista de resultados ou empty state */}
      {!isLoading && (
        <>
          {pokemonsFiltrados.length > 0 ? (
            <div className="pokedex-grid">
              {pokemonsFiltrados.map((pokemon) => (
                <div key={pokemon.name} className="pokedex-resultado">
                  <PokeCard pokemon={pokemon} />
                </div>
              ))}
            </div>
          ) : (
            <ListEmptyComponent />
          )}
        </>
      )}
    </div>
  );
}