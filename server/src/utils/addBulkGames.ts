import type { Game } from "../../../types/Game";
import { prisma } from "../../prisma/index";
import data from "../data.json";

async function addGamesToModel(gameDataArray: Game[]) {
  try {
    const gamePromises = gameDataArray.map((gameData: Game) => {
      console.log("Adding Game with title =>", gameData.title);

      return prisma.game.create({
        data: {
          approvalRating: Math.ceil(parseInt(gameData.approvalRating.toFixed(2))),
          totalReviews: gameData.totalReviews,
          topCriticAvgScore: gameData.topCriticAvgScore,
          category: gameData.category,
          title: gameData.title,
          firstReleaseDate: new Date(gameData.firstReleaseDate).getFullYear(),
          url: gameData.url,
        },
      });
    });

    const games = await Promise.all(gamePromises);
    console.log(`Added ${games.length} games`);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

addGamesToModel(data as Game[]);
