# Proposta de Refatoração — MVVM para a PokedexScreen

## 1. Padrão Escolhido: MVVM

O MVVM (Model-View-ViewModel) é a escolha mais natural para este projeto por dois motivos:

1. **Compatibilidade com React Hooks:** o ViewModel se traduz diretamente em um custom hook (`usePokedexViewModel`), que é um padrão já idiomático no React — sem necessidade de criar interfaces ou classes artificiais.
2. **Separação testável:** a lógica de busca, filtragem e paginação pode ser testada de forma isolada no ViewModel, sem precisar renderizar nenhum componente visual.

## 2. Nova Estrutura de Arquivos

```
pokedex/
├── screens/
│   └── Pokedex/
│       ├── PokedexScreen.tsx          ← View (apenas JSX, sem lógica)
│       └── usePokedexViewModel.ts     ← ViewModel (estado + lógica)
├── components/
│   ├── PokeCard/
│   │   ├── PokeCard.tsx
│   │   └── PokeCard.css
│   ├── StatBar.tsx
│   └── TypeBadge.tsx
├── services/
│   └── api.ts                         ← Model (acesso a dados)
└── utils/
    ├── format.ts
    └── useSafeAreaInsets.ts
```

## 3. Divisão de Responsabilidades

### View — `PokedexScreen.tsx`

Responsável apenas por renderizar a interface. Consome o ViewModel via hook e não contém nenhuma lógica de negócio.

```tsx
export default function PokedexScreen() {
  const vm = usePokedexViewModel();

  return (
    <div className="pokedex-container">
      <input
        value={vm.inputBusca}
        onChange={e => vm.setInputBusca(e.target.value)}
        onKeyDown={e => e.key === "Enter" && vm.buscar()}
        placeholder="Ex: pikachu, bulbasaur..."
      />
      <button onClick={vm.buscar}>Buscar</button>
      {vm.busca && (
        <button onClick={vm.limparBusca}>✕</button>
      )}

      {vm.isLoading && <div className="spinner" />}
      {vm.erro && <p className="erro">{vm.erro}</p>}

      <div className="grid">
        {vm.pokemonsFiltrados.map(p => (
          <PokeCard key={p.name} pokemon={p} />
        ))}
      </div>

      {/* sentinela para scroll infinito */}
      <div ref={vm.sentinelaRef} />
    </div>
  );
}
```

### ViewModel — `usePokedexViewModel.ts`

Contém todo o estado e toda a lógica. Expõe para a View apenas o que ela precisa renderizar e as ações que pode disparar.

```ts
export function usePokedexViewModel() {
  // Estados internos
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [busca, setBusca] = useState("");
  const [inputBusca, setInputBusca] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [erro, setErro] = useState("");
  const [offset, setOffset] = useState(0);
  const [temMais, setTemMais] = useState(true);
  const sentinelaRef = useRef<HTMLDivElement | null>(null);

  // Lógica de carregamento inicial, paginação e busca...

  // Interface pública exposta para a View
  return {
    // Estados
    pokemonsFiltrados,
    inputBusca,
    busca,
    isLoading,
    isLoadingMore,
    erro,
    temMais,
    sentinelaRef,
    // Ações
    setInputBusca,
    buscar,
    limparBusca,
  };
}
```

### Model — `services/api.ts`

Permanece como está. É a camada de acesso a dados, responsável por buscar e tipar as respostas da PokéAPI. Não tem conhecimento de estado nem de interface.

## 4. Fluxo de Dados — "O que acontece quando o usuário digita na busca?"

```
1. Usuário digita na <input> da View (PokedexScreen)
        ↓
2. View chama vm.setInputBusca(texto)
        ↓
3. ViewModel atualiza o estado inputBusca
        ↓
4. React re-renderiza a View com o novo valor no input
        ↓
5. Usuário pressiona Enter ou clica em "Buscar"
        ↓
6. View chama vm.buscar()
        ↓
7. ViewModel verifica se o Pokémon já existe na lista local
   ├── Se sim: atualiza busca para filtrar localmente (sem chamada à API)
   └── Se não: chama services/api.fetchPokemon(inputBusca)
        ↓
8. ViewModel atualiza isLoading → true
   (View automaticamente exibe o spinner por re-renderização reativa)
        ↓
9. API retorna resultado
        ↓
10. ViewModel atualiza pokemons, busca e isLoading → false
        ↓
11. View re-renderiza com os novos cards visíveis e spinner oculto
```

Esta separação garante que a lógica dos passos 7 a 10 possa ser testada unitariamente sem renderizar nenhum componente, bastando chamar `buscar()` diretamente no hook e verificar os estados resultantes com ferramentas como React Testing Library ou Vitest.
