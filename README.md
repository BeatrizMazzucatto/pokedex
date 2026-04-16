# 🔴 Pokédex React

<div align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite)
![CSS3](https://img.shields.io/badge/CSS3-Modular-1572B6?style=for-the-badge&logo=css3)

**Aplicação de busca de Pokémons com React, TypeScript e PokéAPI**

[Funcionalidades](#-funcionalidades) • [Tecnologias](#-tecnologias) • [Instalação](#-instalação) • [Como Usar](#-como-usar)

</div>

---

## 📋 Sobre o Projeto

A **Pokédex React** é uma aplicação web desenvolvida em React com TypeScript como exercício prático da disciplina de **Desenvolvimento Mobile**. O projeto aplica os conceitos fundamentais do React — componentes, props, `useState` e `useEffect` — consumindo a [PokéAPI](https://pokeapi.co) para buscar e exibir informações reais de Pokémons.

### 🎯 Objetivo

Praticar a construção de interfaces dinâmicas com React, aplicando:

- 🧩 Componentização com reutilização de código
- 📦 Comunicação entre componentes via props
- 🔄 Gerenciamento de estado local com `useState`
- ⚡ Efeitos colaterais com `useEffect`
- 🌐 Consumo de API REST externa
- 🎨 Estilização modular com CSS separado por componente

---

## ✨ Funcionalidades

<table>
<tr>
<td width="50%">

### 🔍 Busca de Pokémons

- ✅ Busca por nome em tempo real
- ✅ Integração com a PokéAPI
- ✅ Exibição de sprite oficial
- ✅ Indicador de carregamento (spinner)
- ✅ Mensagem de erro para nomes inválidos
- ✅ Busca ao pressionar Enter

</td>
<td width="50%">

### 🃏 Card do Pokémon

- ✅ Nome capitalizado com ícone de favorito
- ✅ Imagem oficial (sprite)
- ✅ Altura em centímetros
- ✅ Peso em quilogramas
- ✅ Tipos com cores específicas por tipo
- ✅ Botão de favoritar/desfavoritar

</td>
</tr>
</table>

### ⚙️ Recursos Técnicos

- ✅ Componente `PokeCard` recebe dados via props (apenas leitura)
- ✅ Estado de favorito local ao `PokeCard` com `useState`
- ✅ `useEffect` registra no console cada Pokémon carregado
- ✅ CSS separado por componente (`Pokedex.css` e `PokeCard.css`)
- ✅ Tipagem completa com TypeScript (`type Pokemon`, `type PokeCardProps`)
- ✅ Animação de entrada do card com keyframes CSS

---

## 🛠 Tecnologias

<div align="center">

| Categoria | Tecnologias |
|-----------|-------------|
| **Frontend** | React 18, TypeScript 5, JSX |
| **Build** | Vite 8.0 |
| **Estilização** | CSS3 Modular, Keyframes, Variáveis CSS |
| **API** | PokéAPI (https://pokeapi.co) |
| **Hooks** | useState, useEffect |
| **Linguagem** | TypeScript com tipagem estrita |

</div>

---

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado:

```bash
# Node.js 18 ou superior
node -v

# npm (já vem com o Node.js)
npm -v
```

---

## 🚀 Instalação

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/seu-usuario/pokedex-react.git
cd pokedex-react
```

### 2️⃣ Crie o projeto com Vite (se ainda não criado)

```bash
npm create vite@latest . -- --template react-ts
```

### 3️⃣ Instale as dependências

```bash
npm install
```

### 4️⃣ Organize a estrutura de arquivos

```bash
mkdir -p src/components
mv PokeCard.tsx src/components/
mv PokeCard.css src/components/
mv Pokedex.tsx src/components/
mv Pokedex.css src/components/
```

### 5️⃣ Comente o CSS padrão do Vite

Em `src/main.tsx`, comente a linha:

```tsx
// import './index.css'
```

---

## 💻 Como Usar

### ▶️ Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Acesse em: **http://localhost:5173**

### 📱 Fluxo de Uso

1. **🔍 Busca**
   - Digite o nome de um Pokémon no campo de texto
   - Clique em "Buscar" ou pressione **Enter**
   - Aguarde o spinner de carregamento

2. **🃏 Visualização**
   - O card do Pokémon aparece com sprite, tipos, altura e peso
   - Cores dos tipos são aplicadas automaticamente

3. **⭐ Favoritar**
   - Clique no botão "Favoritar" para marcar o Pokémon
   - Um ⭐ aparece ao lado do nome
   - O card recebe destaque visual dourado
   - Clique novamente para desfavoritar

4. **🖥️ Console**
   - Abra o console do navegador (F12 → Console)
   - A cada busca, veja a mensagem: `Pokémon pikachu carregado com sucesso!`

---

## 📁 Estrutura do Projeto

```
pokedex-react/
├── 📂 src/
│   ├── 📂 components/
│   │   ├── PokeCard.tsx      ← Componente do card (recebe props)
│   │   ├── PokeCard.css      ← Estilização isolada do card
│   │   ├── Pokedex.tsx       ← Componente principal (busca + estado)
│   │   └── Pokedex.css       ← Estilização da tela principal
│   ├── App.tsx               ← Componente raiz
│   └── main.tsx              ← Ponto de entrada
├── 📄 index.html
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 vite.config.ts
└── 📖 README.md
```

---

## 🧩 Conceitos Aplicados

### Props (somente leitura)

```tsx
type PokeCardProps = {
  pokemon: Pokemon;
};

export function PokeCard({ pokemon }: PokeCardProps) {
  // pokemon é apenas leitura — não pode ser modificado aqui
}
```

### useState (estado local)

```tsx
const [favorito, setFavorito] = useState(false);

<button onClick={() => setFavorito(!favorito)}>
  {favorito ? "💔 Remover" : "⭐ Favoritar"}
</button>
```

### useEffect (efeito colateral)

```tsx
useEffect(() => {
  console.log(`Pokémon ${pokemon.name} carregado com sucesso!`);
}, [pokemon]); // dispara toda vez que o pokémon muda
```

---

## 📊 Critérios de Avaliação

| Critério | Peso |
|----------|------|
| Uso correto de props e `PokeCard` | 3.0 |
| Implementação da lógica de favorito | 2.0 |
| Uso de `useEffect` para log de evento | 2.0 |
| Organização do CSS em arquivos separados | 1.5 |
| Organização geral e clareza do código | 1.5 |
| **Total** | **10.0** |

---

## 🌐 API Utilizada

**PokéAPI** — `https://pokeapi.co/api/v2/pokemon/{nome}`

Exemplo de resposta utilizada:

```json
{
  "name": "pikachu",
  "height": 4,
  "weight": 60,
  "sprites": {
    "front_default": "https://..."
  },
  "types": [
    { "type": { "name": "electric" } }
  ]
}
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

<div align="center">

⭐ **Se este projeto foi útil, considere dar uma estrela!** ⭐

---

**Instituto Federal de Educação, Ciência e Tecnologia de São Paulo — Câmpus Guarulhos**  
**Desenvolvimento para Dispositivos Móveis**

**Última atualização:** Março 2026

</div>
