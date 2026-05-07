import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPokemon, fetchPokemonSpecies } from "./services/api";
import type { Pokemon, PokemonSpecies } from "./services/api";
import { capitalize } from "./utils/format";
import "./PokemonDetailScreen.css";

const TYPE_COLORS: Record<string, string> = {
  fire: "#f08030",
  water: "#6890f0",
  grass: "#78c850",
  electric: "#f8d030",
  ice: "#98d8d8",
  fighting: "#c03028",
  poison: "#a040a0",
  ground: "#e0c068",
  flying: "#a890f0",
  psychic: "#f85888",
  bug: "#a8b820",
  rock: "#b8a038",
  ghost: "#705898",
  dragon: "#7038f8",
  dark: "#705848",
  steel: "#b8b8d0",
  fairy: "#ee99ac",
  normal: "#a8a878",
};

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Ataque",
  defense: "Defesa",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Velocidade",
};

function StatBar({ label, value }: { label: string; value: number }) {
  const pct = Math.min((value / 255) * 100, 100);
  const color = value >= 90 ? "#4caf50" : value >= 60 ? "#f6c90e" : "#f44336";
  return (
    <div className="detail__stat-row">
      <span className="detail__stat-label">{label}</span>
      <span className="detail__stat-num">{value}</span>
      <div className="detail__stat-bar-bg">
        <div
          className="detail__stat-bar-fill"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default function PokemonDetailScreen() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!name) return;
    setIsLoading(true);
    setErro("");

    const load = async () => {
      try {
        const poke = await fetchPokemon(name);
        setPokemon(poke);
        // Desafio extra: busca espécie para descrição
        try {
          const spec = await fetchPokemonSpecies(poke.id);
          setSpecies(spec);
        } catch {
          // descrição é opcional, falha silenciosa
        }
      } catch {
        setErro("Não foi possível carregar os dados deste Pokémon.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [name]);

  const mainType = pokemon?.types[0]?.type.name ?? "normal";
  const bgColor = TYPE_COLORS[mainType] ?? "#a8a878";

  // Pega a descrição em português, fallback para inglês
  const descricao = species?.flavor_text_entries
    .find((e) => e.language.name === "pt-BR" || e.language.name === "pt")
    ?.flavor_text
    ?? species?.flavor_text_entries
      .find((e) => e.language.name === "en")
      ?.flavor_text
      .replace(/\f/g, " ")
      .replace(/\n/g, " ");

  const genero = species?.genera.find((g) => g.language.name === "en")?.genus;

  const artwork =
    pokemon?.sprites.other?.["official-artwork"]?.front_default ??
    pokemon?.sprites.front_default;

  if (isLoading) {
    return (
      <div className="detail__loading-screen">
        <div className="detail__pokeball-spinner" />
        <p>Carregando dados…</p>
      </div>
    );
  }

  if (erro || !pokemon) {
    return (
      <div className="detail__error-screen">
        <span className="detail__error-icon">😵</span>
        <p>{erro || "Pokémon não encontrado."}</p>
        <button onClick={() => navigate(-1)} className="detail__back-btn">
          ← Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="detail__container">
      {/* Hero com cor do tipo */}
      <div className="detail__hero" style={{ background: bgColor }}>
        <button
          className="detail__back-btn detail__back-btn--hero"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
        >
          ← Voltar
        </button>

        <div className="detail__hero-text">
          <span className="detail__id">#{String(pokemon.id).padStart(3, "0")}</span>
          <h1 className="detail__nome">{capitalize(pokemon.name)}</h1>
          {genero && <p className="detail__genero">{genero}</p>}
          <div className="detail__tipos">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="detail__tipo"
                style={{ background: "rgba(255,255,255,0.25)" }}
              >
                {capitalize(t.type.name)}
              </span>
            ))}
          </div>
        </div>

        <img
          src={artwork ?? ""}
          alt={pokemon.name}
          className="detail__artwork"
        />
      </div>

      {/* Corpo */}
      <div className="detail__body">

        {/* Descrição */}
        {descricao && (
          <section className="detail__section">
            <p className="detail__descricao">{descricao}</p>
          </section>
        )}

        {/* Medidas */}
        <section className="detail__section">
          <h2 className="detail__section-title">Informações</h2>
          <div className="detail__info-grid">
            <div className="detail__info-item">
              <span className="detail__info-label">Altura</span>
              <span className="detail__info-valor">{pokemon.height * 10} cm</span>
            </div>
            <div className="detail__info-item">
              <span className="detail__info-label">Peso</span>
              <span className="detail__info-valor">{(pokemon.weight / 10).toFixed(1)} kg</span>
            </div>
            <div className="detail__info-item">
              <span className="detail__info-label">Habilidades</span>
              <span className="detail__info-valor">
                {pokemon.abilities
                  .filter((a) => !a.is_hidden)
                  .map((a) => capitalize(a.ability.name))
                  .join(", ")}
              </span>
            </div>
            {pokemon.abilities.find((a) => a.is_hidden) && (
              <div className="detail__info-item">
                <span className="detail__info-label">Hab. Oculta</span>
                <span className="detail__info-valor detail__info-valor--hidden">
                  {capitalize(
                    pokemon.abilities.find((a) => a.is_hidden)!.ability.name
                  )}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Stats */}
        <section className="detail__section">
          <h2 className="detail__section-title">Estatísticas Base</h2>
          <div className="detail__stats">
            {pokemon.stats.map((s) => (
              <StatBar
                key={s.stat.name}
                label={STAT_LABELS[s.stat.name] ?? capitalize(s.stat.name)}
                value={s.base_stat}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}