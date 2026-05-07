export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other?: {
      "official-artwork"?: {
        front_default: string | null;
      };
    };
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

export type PokemonSpecies = {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: { name: string };
    version: { name: string };
  }>;
  genera: Array<{
    genus: string;
    language: { name: string };
  }>;
  capture_rate: number;
  base_happiness: number;
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

export const fetchPokemonSpecies = async (id: number): Promise<PokemonSpecies> => {
  const resposta = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );
  if (!resposta.ok) {
    throw new Error("Espécie não encontrada");
  }
  return resposta.json();
};

export const POKEMONS_POR_PAGINA = 12;

export const getPokemons = async (offset: number = 0): Promise<Pokemon[]> => {
  const listaResp = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${POKEMONS_POR_PAGINA}`
  );
  if (!listaResp.ok) {
    throw new Error("Falha ao carregar lista de Pokémons");
  }
  const lista = await listaResp.json() as {
    results: Array<{ name: string; url: string }>;
    count: number;
  };

  const resultados = await Promise.allSettled(
    lista.results.map((p) => fetchPokemon(p.name))
  );

  return resultados
    .filter((r): r is PromiseFulfilledResult<Pokemon> => r.status === "fulfilled")
    .map((r) => r.value);
};