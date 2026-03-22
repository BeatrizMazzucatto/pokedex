import React, { useState, useEffect } from "react";
//import "./PokeCard.css";

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

type PokeCardProps = {
  pokemon: Pokemon;
};

export function PokeCard({ pokemon }: PokeCardProps) {
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    console.log(`Pokémon ${pokemon.name} carregado com sucesso!`);
  }, [pokemon]);

  const tipos = pokemon.types.map((t) => t.type.name);

  return (
    <div className={`pokecard ${favorito ? "pokecard--favorito" : ""}`}>
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
            {pokemon.name}
            {favorito && <span className="pokecard__estrela">⭐</span>}
          </h3>
          <div className="pokecard__tipos">
            {tipos.map((tipo) => (
              <span key={tipo} className={`pokecard__tipo pokecard__tipo--${tipo}`}>
                {tipo}
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
        onClick={() => setFavorito(!favorito)}
      >
        {favorito ? "💔 Remover dos favoritos" : "⭐ Favoritar"}
      </button>
    </div>
  );
}
