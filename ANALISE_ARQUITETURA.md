# Análise da Arquitetura — Pokédex React

## 1. Estrutura de Diretórios

A organização atual é funcional para o tamanho do projeto. Os arquivos principais (`App.tsx`, `Pokedex.tsx`, `PokeCard.tsx`, `PokemonDetailScreen.tsx`) ficam na raiz, enquanto utilitários ficam em `utils/` e serviços de API em `services/`. Essa separação é clara e intuitiva.

**O que eu mudaria:** criaria uma pasta `components/` para `PokeCard.tsx` e `PokeCard.css`, e uma pasta `screens/` para `Pokedex.tsx` e `PokemonDetailScreen.tsx`. Isso deixaria a raiz do projeto mais limpa e seguiria a convenção de projetos React maiores.

Estrutura sugerida:

```
pokedex/
├── screens/
│   ├── Pokedex/
│   │   ├── Pokedex.tsx
│   │   └── Pokedex.css
│   └── PokemonDetail/
│       ├── PokemonDetailScreen.tsx
│       └── PokemonDetailScreen.css
├── components/
│   ├── PokeCard.tsx
│   └── PokeCard.css
├── services/
│   └── api.ts
├── utils/
│   ├── format.ts
│   └── useSafeAreaInsets.ts
├── App.tsx
└── ...
```

## 2. Componentização

O `PokeCard` é um bom exemplo de componente reutilizável: recebe dados via props, mantém estado local de favorito isolado, e não depende de lógica externa. Isso demonstra boa separação de responsabilidades.

Na `PokemonDetailScreen`, eu extrairia os seguintes componentes reutilizáveis:

- **`StatBar`** — já existe como função local no arquivo, mas poderia ser movido para `components/StatBar.tsx` para ser reutilizado em outras telas futuras.
- **`InfoGrid`** — o bloco de altura, peso e habilidades poderia virar um componente `components/PokemonInfoGrid.tsx`.
- **`TypeBadge`** — a exibição dos tipos com cor de fundo poderia ser um componente `components/TypeBadge.tsx`, já que a mesma lógica de badge colorida é duplicada entre `PokeCard.tsx` e `PokemonDetailScreen.tsx`.

## 3. Gerenciamento de Estado e Lógica

**Na `PokedexScreen`:** toda a lógica de busca, filtragem, paginação e estado (`busca`, `pokemons`, `offset`, `isLoading`, `erro`) está dentro do componente de tela. Isso torna o componente extenso — cerca de 180 linhas de lógica antes do JSX.

**Na `PokemonDetailScreen`:** a lógica de busca dos dados do Pokémon e da espécie também está diretamente no componente, dentro de um `useEffect`.

**Essa abordagem é sustentável no curto prazo**, mas apresenta limitações conforme o app cresce:

- **Prós:** simples de entender, sem abstrações extras, fácil de depurar em projetos pequenos.
- **Contras:** dificulta testes unitários (não é possível testar a lógica sem renderizar o componente), lógica repetida entre telas se o app crescer, e o componente acumula responsabilidades de View e de lógica de negócio ao mesmo tempo.

## 4. Pontos Fortes e Fracos

### ✅ Pontos Fortes

1. **Separação de serviços de API:** o arquivo `services/api.ts` concentra todas as chamadas à PokéAPI com tipagem TypeScript completa (`Pokemon`, `PokemonSpecies`). Isso facilita manutenção — se a API mudar, apenas um arquivo precisa ser alterado.

2. **Uso correto de hooks do React:** `useMemo` para filtragem, `useCallback` para evitar recriação de funções, `useRef` para controle de carregamento duplo, e `IntersectionObserver` para scroll infinito. O código demonstra bom domínio dos recursos do React.

### ❌ Pontos Fracos

1. **Lógica de negócio misturada com View:** `PokedexScreen` tem mais de 200 linhas acumulando estado, lógica de busca, filtragem, paginação e JSX. Isso viola o princípio de responsabilidade única e dificulta testes isolados.

2. **Duplicação de tipos:** o tipo `Pokemon` é definido localmente em `PokeCard.tsx` e também exportado de `services/api.ts`. Com o crescimento do projeto, essa duplicação pode gerar inconsistências caso os campos sejam atualizados em um lugar e esquecidos em outro. O ideal seria sempre importar de `services/api.ts`.
