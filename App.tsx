import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pokedex from "./Pokedex";
import PokemonDetailScreen from "./PokemonDetailScreen";
import "./Pokedex.css";
import "./PokeCard.css";

export default function App() {
  return (
    // BrowserRouter = equivalente ao NavigationContainer do React Navigation
    <BrowserRouter>
      <Routes>
        {/* Rota raiz → lista de Pokémons */}
        <Route path="/" element={<Pokedex />} />

        {/* Rota de detalhes → recebe o nome como parâmetro (:name) */}
        {/* Equivalente a Stack.Screen name="PokemonDetail" no React Navigation */}
        <Route path="/pokemon/:name" element={<PokemonDetailScreen />} />
      </Routes>
    </BrowserRouter>
  );
}