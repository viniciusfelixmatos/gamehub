import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { GameDetails } from "../pages/GameDetails";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/:id" element={<GameDetails />} />
    </Routes>
  );
}
