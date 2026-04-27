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
  try {
    const resposta = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`
    );
    if (!resposta.ok) {
      throw new Error("Pokémon não encontrado");
    }
    const dados = await resposta.json();
    return dados;
  } catch (error) {
    // Re-lança o erro para ser tratado pela tela
    throw error;
  }
};
