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