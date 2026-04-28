export type Pokemon = {
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

export const fetchPokemon = async (nome: string): Promise<Pokemon> => {
  const resposta = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase().trim()}`
  );
  if (!resposta.ok) {
    throw new Error("Pokémon não encontrado");
  }
  const dados = await resposta.json();
  return dados;
};

// Lista inicial de pokémons para exibir
const POKEMONS_INICIAIS = [
  "pikachu", "bulbasaur", "charmander", "squirtle",
  "jigglypuff", "meowth", "psyduck", "gengar",
  "eevee", "snorlax", "mewtwo", "gyarados",
];

export const fetchPokemonsIniciais = async (): Promise<Pokemon[]> => {
  const resultados = await Promise.allSettled(
    POKEMONS_INICIAIS.map((nome) => fetchPokemon(nome))
  );
  return resultados
    .filter((r): r is PromiseFulfilledResult<Pokemon> => r.status === "fulfilled")
    .map((r) => r.value);
};