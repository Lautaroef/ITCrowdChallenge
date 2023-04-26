import { Game } from "@prisma/client";
import zod from "zod";

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

type Res = Response<{ message: string }>;

const prisma = new PrismaClient();

// Get all games
const getAllGames = async (_: Request, res: Response): Promise<Game[] | Res> => {
  try {
    const games = await prisma.game.findMany();

    return res.status(200).json(games);
  } catch (err: any) {
    console.log("error=?", err.message);

    return res.status(500).json({ message: "Game not Available" });
  }
};

// Get a game by ID
const getGameById = async (req: Request, res: Response): Promise<Game | Res> => {
  const gameId = parseInt(req.params.id);

  // Check if the game ID is valid
  if (isNaN(gameId)) {
    return res.status(400).json({ message: "Invalid game ID" });
  }

  // Query the database for the game with the specified ID
  try {
    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
    });

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    return res.json(game);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Search for games by title
const searchGame = async (req: Request, res: Response): Promise<Game[] | Res> => {
  const title = String(req.query.q);

  try {
    // Query the database for games that match the search criteria
    const games = await prisma.game.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
    });

    return res.status(200).json(games);
  } catch (err) {
    return res.status(500).json({ message: "Game not found" });
  }
};

// Get top games by recommendation
const getTopGames = async (_: Request, res: Response): Promise<Game[] | Res> => {
  try {
    // Finding Games by Recommendation
    const games = await prisma.game.findMany({
      orderBy: {
        approvalRating: "desc",
      },
      take: 10,
    });

    // Return the created game as the response
    return res.json(games);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Game not found" });
  }
};

// Get top games by critic score
const addGame = async (req: Request, res: Response): Promise<Game | Res> => {
  // Input validation
  const schema = zod.object({
    approvalRating: zod.number().min(0).max(100),
    totalReviews: zod.number().min(0),
    topCriticAvgScore: zod.number().min(0).max(100),
    category: zod.string(),
    title: zod.string(),
    firstReleaseDate: zod.number(),
    url: zod.string(),
  });

  // Validate the input
  const validation = schema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ error: validation.error });
  }

  // Create the game in the database using Prisma
  const { data } = validation;
  try {
    const game = await prisma.game.create({
      data: {
        approvalRating: data.approvalRating,
        totalReviews: data.totalReviews,
        topCriticAvgScore: data.topCriticAvgScore,
        category: data.category,
        title: data.title,
        firstReleaseDate: new Date(data.firstReleaseDate).getFullYear(),
        url: data.url,
      },
    });

    return res.json(game);
  } catch (error) {
    console.error("err=>", error);
    return res.status(500).json({ error: "Failed to create game" });
  }
};

// Update a game by ID
const updateGame = async (req: Request, res: Response): Promise<Game | Res> => {
  const gameId = parseInt(req.params.id);

  // Update the game in the database using Prisma
  try {
    // Build the update object based on non-empty fields in the req.body
    const updateObject: Record<string, unknown> = {};
    for (const key in req.body) {
      if (req.body[key]) {
        updateObject[key] = req.body[key];
      }
    }

    const updatedGame = await prisma.game.update({
      where: {
        id: gameId,
      },
      data: updateObject,
    });

    return res.json(updatedGame);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update game" });
  }
};
export { getAllGames, getGameById, searchGame, getTopGames, addGame, updateGame };
