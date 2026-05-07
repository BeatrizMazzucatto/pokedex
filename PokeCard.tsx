import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { capitalize } from "./utils/format";

type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
  };
  types: Array<{
    type: { name: string };
  }>;
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  abilities: Array<{
    ability: { name: string };
    is_hidden: boolean;
  }>;
};

type PokeCardProps = {
  pokemon: Pokemon;
};

export function PokeCard({ pokemon }: PokeCardProps) {
  const [favorito, setFavorito] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`Pokémon ${pokemon.name} carregado com sucesso!`);
  }, [pokemon]);

  const tipos = pokemon.types.map((t) => t.type.name);

  const handleCardClick = () => {
    // Equivalente ao TouchableOpacity + navigate() do React Navigation
    navigate(`/pokemon/${pokemon.name}`);
  };

  const handleFavoritoClick = (e: React.MouseEvent) => {
    // Impede que o clique no botão também navegue para a tela de detalhes
    e.stopPropagation();
    setFavorito(!favorito);
  };

  return (
    <div
      className={`pokecard ${favorito ? "pokecard--favorito" : ""} pokecard--clickable`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalhes de ${capitalize(pokemon.name)}`}
      onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
    >
      <div className="pokecard__header">
        {pokemon.sprites.front_default && (
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="pokecard__imagem"
          />
        )}
        <div className="pokecard__titulo">
          <h3 className="pokecard__nome">
            {capitalize(pokemon.name)}
            {favorito && <span className="pokecard__estrela">⭐</span>}
          </h3>
          <div className="pokecard__tipos">
            {tipos.map((tipo) => (
              <span key={tipo} className={`pokecard__tipo pokecard__tipo--${tipo}`}>
                {capitalize(tipo)}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pokecard__stats">
        <div className="pokecard__stat">
          <span className="pokecard__stat-label">Altura</span>
          <span className="pokecard__stat-valor">{pokemon.height * 10} cm</span>
        </div>
        <div className="pokecard__stat">
          <span className="pokecard__stat-label">Peso</span>
          <span className="pokecard__stat-valor">{pokemon.weight / 10} kg</span>
        </div>
      </div>

      <button
        className={`pokecard__botao-favorito ${favorito ? "pokecard__botao-favorito--ativo" : ""}`}
        onClick={handleFavoritoClick}
      >
        {favorito ? "💔 Remover dos favoritos" : "⭐ Favoritar"}
      </button>
    </div>
  );
}