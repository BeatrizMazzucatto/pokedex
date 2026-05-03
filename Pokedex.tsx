import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { PokeCard } from "./PokeCard";
import type { Pokemon } from "./services/api";
import { fetchPokemon, getPokemons, POKEMONS_POR_PAGINA } from "./services/api";

export default function PokedexScreen() {
  const [busca, setBusca] = useState("");
  const [inputBusca, setInputBusca] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false); 
  const [erro, setErro] = useState("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [carregamentoInicial, setCarregamentoInicial] = useState(true);

  const [offset, setOffset] = useState(0);

  const [temMais, setTemMais] = useState(true);

  const sentinelaRef = useRef<HTMLDivElement | null>(null);

  const carregandoRef = useRef(false);

  useEffect(() => {
    const carregarIniciais = async () => {
      setIsLoading(true);
      setErro("");
      try {
        const dados = await getPokemons(0);
        setPokemons(dados);
        setOffset(POKEMONS_POR_PAGINA);                         
        setTemMais(dados.length === POKEMONS_POR_PAGINA);       
      } catch {
        setErro("Falha ao carregar Pokémons. Verifique sua conexão.");
      } finally {
        setIsLoading(false);
        setCarregamentoInicial(false);
      }
    };
    carregarIniciais();
  }, []);


  const loadMorePokemons = useCallback(async () => {

    if (carregandoRef.current || !temMais || busca.trim()) return;
    carregandoRef.current = true;
    setIsLoadingMore(true);
    try {
      const dados = await getPokemons(offset);
      if (dados.length === 0) {
        setTemMais(false);
      } else {
        setPokemons((prev) => {

          const novos = dados.filter(
            (d) => !prev.some((p) => p.name === d.name)
          );
          return [...prev, ...novos];
        });
        setOffset((prev) => prev + POKEMONS_POR_PAGINA);
        setTemMais(dados.length === POKEMONS_POR_PAGINA);
      }
    } catch {
      // falha silenciosa — não apaga a lista já exibida
    } finally {
      setIsLoadingMore(false);
      carregandoRef.current = false;
    }
  }, [offset, temMais, busca]);

  useEffect(() => {
    const sentinela = sentinelaRef.current;
    if (!sentinela) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePokemons();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(sentinela);
    return () => observer.disconnect();
  }, [loadMorePokemons]);

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

    const encontradoLocal = pokemons.some((p) =>
      p.name.toLowerCase() === termo.toLowerCase()
    );

    if (encontradoLocal) {
      setBusca(termo);
      return;
    }

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
      setBusca(termo); 
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

  const ListFooterComponent = () => {
    if (busca.trim()) return null; 
    if (isLoadingMore) {
      return (
        <div className="pokedex-footer-loading">
          <div className="pokedex-loading__spinner"></div>
          <p>Carregando mais Pokémons…</p>
        </div>
      );
    }
    if (!temMais && pokemons.length > 0) {
      return (
        <div className="pokedex-footer-fim">
          <span>🎉 Você viu todos os {pokemons.length} Pokémons carregados!</span>
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

      {/* Spinner de carregamento inicial */}
      {isLoading && (
        <div className="pokedex-loading">
          <div className="pokedex-loading__spinner"></div>
          <p>Carregando Pokémons…</p>
        </div>
      )}

      {}
      {erro && <p className="pokedex-error">{erro}</p>}

      {}
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

          {}
          {!busca.trim() && temMais && (
            <div ref={sentinelaRef} className="pokedex-sentinela" />
          )}

          {}
          <ListFooterComponent />
        </>
      )}
    </div>
  );
}