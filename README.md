# 🔴 Pokédex React

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=reactrouter)

**Aplicação de busca e navegação de Pokémons com React, TypeScript e PokéAPI**

[Funcionalidades](#-funcionalidades) • [Tecnologias](#-tecnologias) • [Instalação](#-instalação) • [Como Usar](#-como-usar) • [Autoras](#-autoras)

</div>

---

## 📋 Sobre o Projeto

A **Pokédex React** é uma aplicação web desenvolvida em React com TypeScript como exercício prático da disciplina de **Desenvolvimento para Dispositivos Móveis** do IFSP Guarulhos. O projeto consome a [PokéAPI](https://pokeapi.co) para buscar e exibir informações reais de Pokémons, com navegação entre telas e recursos avançados de React.

### 🎯 Objetivo

Praticar a construção de interfaces dinâmicas com React, aplicando:

- 🧩 Componentização e reutilização de código
- 📦 Comunicação entre componentes via props
- 🔄 Gerenciamento de estado com `useState`, `useEffect`, `useMemo`, `useCallback` e `useRef`
- 🗺️ Navegação entre telas com `react-router-dom`
- 🌐 Consumo de API REST externa com tratamento de erros
- 📱 Suporte a área segura (safe area) — equivalente web do `useSafeAreaInsets` do React Native
- ♾️ Scroll infinito com `IntersectionObserver`

---

## ✨ Funcionalidades

### 🔍 Tela Principal — Pokédex

- ✅ Carregamento inicial automático de 12 Pokémons
- ✅ Scroll infinito — carrega mais ao rolar a página
- ✅ Busca por nome com fallback para a PokéAPI se não encontrado localmente
- ✅ Filtro em tempo real na lista carregada
- ✅ Spinner de carregamento no início e na paginação
- ✅ Mensagem de erro amigável para falhas de conexão
- ✅ Estado vazio contextualizado: busca sem resultado vs. lista vazia
- ✅ Busca ao pressionar Enter ou clicar no botão

### 🃏 Card do Pokémon — PokeCard

- ✅ Nome capitalizado
- ✅ Imagem oficial (sprite)
- ✅ Altura em centímetros e peso em quilogramas
- ✅ Tipos com cores específicas por tipo
- ✅ Botão de favoritar/desfavoritar com estado local
- ✅ Clique no card navega para a tela de detalhes

### 📄 Tela de Detalhes — PokemonDetailScreen

- ✅ Hero com cor dinâmica baseada no tipo principal do Pokémon
- ✅ Artwork oficial em alta resolução com animação flutuante
- ✅ Número identificador formatado (`#001`, `#025`…)
- ✅ Gênero da espécie (ex: "Seed Pokémon")
- ✅ Descrição da Pokédex em português, com fallback para inglês
- ✅ Grid de informações: altura, peso, habilidades e habilidade oculta
- ✅ Barras de estatísticas base coloridas por desempenho
- ✅ Botão "← Voltar" com navegação para a tela anterior

### ⚙️ Recursos Técnicos

- ✅ Tipagem completa com TypeScript (`Pokemon`, `PokemonSpecies`, `PokeCardProps`)
- ✅ `useEffect` com log de console a cada Pokémon carregado
- ✅ `useMemo` para filtragem otimizada da lista
- ✅ `useCallback` para evitar recriação desnecessária de funções
- ✅ `useRef` para controlar chamadas duplicadas no scroll infinito
- ✅ Hook personalizado `useSafeAreaInsets` — equivalente web do hook do React Native
- ✅ Suporte a `env(safe-area-inset-*)` para dispositivos com notch e Dynamic Island
- ✅ CSS modular separado por componente

---

## 🛠 Tecnologias

<div align="center">

| Categoria | Tecnologia |
|-----------|------------|
| **Frontend** | React 19, TypeScript 5.9, JSX |
| **Build** | Vite 8.0 |
| **Roteamento** | React Router DOM 7 |
| **Estilização** | CSS3 Modular, Keyframes, `env()` Safe Area |
| **API** | [PokéAPI](https://pokeapi.co) |
| **Hooks** | useState, useEffect, useMemo, useCallback, useRef |

</div>

---

## 📦 Pré-requisitos

```bash
# Node.js 20 ou superior (exigido pelo Vite 8)
node -v

# npm (já vem com o Node.js)
npm -v
```

---

## 🚀 Instalação

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/BeatrizMazzucatto/pokedex.git
cd pokedex
```

### 2️⃣ Instale as dependências

```bash
npm install
```

### 3️⃣ Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse em: **http://localhost:5173**

---

## 💻 Como Usar

1. **🔄 Carregamento automático**
   - Ao abrir o app, os primeiros 12 Pokémons são carregados automaticamente
   - Role para baixo para carregar mais (scroll infinito)

2. **🔍 Busca**
   - Digite o nome de um Pokémon e pressione **Enter** ou clique em "Buscar"
   - Se não estiver na lista local, a PokéAPI é consultada automaticamente
   - Clique em ✕ para limpar a busca e voltar à lista completa

3. **🃏 Favoritar**
   - Clique em "⭐ Favoritar" para marcar o Pokémon (estado local por card)
   - O card recebe destaque visual dourado

4. **📄 Detalhes**
   - Clique em qualquer card para abrir a tela de detalhes
   - Veja artwork oficial, descrição, habilidades e estatísticas base
   - Clique em "← Voltar" para retornar à lista

5. **🖥️ Console**
   - A cada Pokémon renderizado, aparece no console: `Pokémon pikachu carregado com sucesso!`

---

## 📁 Estrutura do Projeto

```
pokedex/
├── App.tsx                     ← BrowserRouter + rotas
├── Pokedex.tsx                 ← Tela principal (busca + scroll infinito)
├── Pokedex.css                 ← Estilos da tela principal
├── PokeCard.tsx                ← Componente de card reutilizável
├── PokeCard.css                ← Estilos do card
├── PokemonDetailScreen.tsx     ← Tela de detalhes do Pokémon
├── PokemonDetailScreen.css     ← Estilos da tela de detalhes
├── ANALISE_ARQUITETURA.md      ← Exercício 1 — Aula 05
├── PROPOSTA_REFATORACAO.md     ← Exercício 2 — Aula 05
├── services/
│   └── api.ts                  ← Tipos e funções para a PokéAPI
├── utils/
│   ├── format.ts               ← capitalize()
│   └── useSafeAreaInsets.ts    ← Hook de área segura
├── src/
│   └── main.tsx                ← Ponto de entrada
├── index.html
├── package.json
├── tsconfig.app.json
└── vite.config.ts
```

---

## 🧩 Conceitos Aplicados

### Navegação com React Router

```tsx
// App.tsx — configuração das rotas
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Pokedex />} />
    <Route path="/pokemon/:name" element={<PokemonDetailScreen />} />
  </Routes>
</BrowserRouter>

// PokeCard.tsx — navegar ao clicar no card
const navigate = useNavigate();
navigate(`/pokemon/${pokemon.name}`);

// PokemonDetailScreen.tsx — ler o parâmetro da URL
const { name } = useParams<{ name: string }>();
```

### Scroll Infinito com IntersectionObserver

```tsx
const sentinelaRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) loadMorePokemons();
    },
    { threshold: 0.1 }
  );
  observer.observe(sentinelaRef.current!);
  return () => observer.disconnect();
}, [loadMorePokemons]);
```

### Hook Personalizado — useSafeAreaInsets

```tsx
// Equivalente web do useSafeAreaInsets do React Native
const insets = useSafeAreaInsets();

<div style={{ paddingTop: `max(40px, calc(40px + ${insets.top}px))` }}>
```

---

## 👥 Autoras

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/BeatrizMazzucatto">
        <img src="https://github.com/BeatrizMazzucatto.png" width="100px;" alt="Beatriz Mazzucatto"/><br>
        <sub><b>Beatriz Mazzucatto</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/analayslla">
        <img src="https://github.com/analayslla.png" width="100px;" alt="Ana Layslla"/><br>
        <sub><b>Ana Layslla</b></sub>
      </a>
    </td>
  </tr>
</table>

---

**Instituto Federal de Educação, Ciência e Tecnologia de São Paulo — Câmpus Guarulhos**  
**Desenvolvimento para Dispositivos Móveis**

**Última atualização:** Maio 2026

</div>
