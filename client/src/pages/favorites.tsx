import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";

import type { Game } from "../../../types/Game";
import GameList from "@/components/games-page/GameList";
import { getFavoriteGames } from "@/helpers/manageFavorites";
import Loading from "@/components/Loading";

const Favorites: NextPage = () => {
  const [favorites, setFavorites] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setFavorites(getFavoriteGames()!);
    setLoading(false);
  }, []);

  const handleBackClick = () => {
    router.back();
  };

  const renderFavorites = () => {
    if (favorites.length) {
      return <GameList games={favorites} setFavorites={setFavorites} />;
    }
    return (
      <Text m="5" fontSize="2xl" textAlign="center">
        There are no Favorites
      </Text>
    );
  };

  if (loading) return <Loading />;

  return (
    <Box p="5" m="5">
      <Button leftIcon={<ArrowBackIcon />} size="sm" onClick={handleBackClick} />
      <Text textAlign="center" m="10" fontSize="2xl" fontWeight="bold">
        My Favorites
      </Text>
      {renderFavorites()}
    </Box>
  );
};

export default Favorites;
