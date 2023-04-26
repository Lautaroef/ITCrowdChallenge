import { Router } from "express";
import {
  addGame,
  getAllGames,
  getGameById,
  getTopGames,
  searchGame,
  updateGame,
} from "../controllers/gameController";

const gamesRouter = Router();

gamesRouter.get("/all-games", getAllGames);
gamesRouter.get("/game/:id", getGameById);
gamesRouter.get("/games", searchGame);
gamesRouter.get("/games-top", getTopGames);
gamesRouter.post("/add-game", addGame);

// PUT /games/:id
gamesRouter.put("/update-game/:id", updateGame);

export default gamesRouter;
