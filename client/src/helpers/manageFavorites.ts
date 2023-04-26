import type { Game } from "../../../types/Game";
import { addToLocalStorage, getFromLocalStorage } from "./localStorage";

const isClient = typeof window !== "undefined";

const addGameToFavorites = (game: Game): void => {
  if (!isClient) return;

  try {
    if (!game) return;

    const favorites = getFavoriteGames();

    if (!isGameInFavorites(game)) {
      favorites?.push(game);
      addToLocalStorage("favoriteGames", favorites);
    }
  } catch (error) {
    console.error("Error adding game to favorites:", error);
  }
};

const removeGameFromFavorites = (game: Game): void => {
  if (!isClient) return;

  try {
    if (!game) return;

    const favorites = getFavoriteGames();

    if (isGameInFavorites(game)) {
      const updatedFavorites = favorites?.filter((favGame) => favGame.id !== game.id);
      addToLocalStorage("favoriteGames", updatedFavorites);
    }
  } catch (error) {
    console.error("Error removing game from favorites:", error);
  }
};

const getFavoriteGames = (): Game[] | null => {
  if (!isClient) return null;

  try {
    return getFromLocalStorage("favoriteGames");
  } catch (error) {
    console.error("Error getting favorite games:", error);
    return [];
  }
};

const isGameInFavorites = (game: Game): boolean | null => {
  if (!isClient) return null;

  try {
    const favorites = getFavoriteGames();
    const found = favorites?.some((favGame) => favGame.id === game.id);

    return found as boolean;
  } catch (error) {
    console.error("Error checking if game is in favorites:", error);
    return false;
  }
};

export { getFavoriteGames, removeGameFromFavorites, addGameToFavorites, isGameInFavorites };
