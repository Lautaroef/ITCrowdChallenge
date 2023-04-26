import type { Game } from "../../../types/Game";
import axiosInstance from "@/helpers/axiosInstance";
import { useEffect, useState } from "react";

const useTopGames = () => {
  const [topGames, setTopGames] = useState<Game[]>([]);

  useEffect(() => {
    const getTopGames = async () => {
      try {
        const { data } = await axiosInstance.get("/games-top");
        setTopGames(data);
      } catch (error) {
        console.log("Error fetching top games:", error);
      }
    };
    getTopGames();
    //eslint-disable-next-line
  }, []);

  return topGames;
};

export default useTopGames;
