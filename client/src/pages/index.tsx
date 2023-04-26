import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { Game } from "../../../types/Game";
import fetchGames from "@/helpers/fetchGames";
import { getFavoriteGames } from "@/helpers/manageFavorites";
import GameList from "@/components/games-page/GameList";
import Sidebar from "@/components/games-page/sidebar";
import SearchBar from "@/components/games-page/SearchBar";
import Loading from "@/components/Loading";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

const Home: NextPage = () => {
  const [query, setQuery] = useState<string>("");
  const [games, setGames] = useState<Game[]>([]);
  const [_, setFavorites] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGameData = async (query: string) => {
      const queryString = query.trim().length ? `games?q=${query}` : "/all-games";
      setLoading(true);
      const gamesData = await fetchGames(queryString);
      setGames(gamesData);
      setLoading(false);
    };

    fetchGameData(query);
    setFavorites(getFavoriteGames() as Game[]);
  }, [query]);

  return (
    <>
      <Heading as="h1" size="xl" textAlign="center" mt={4}>
        IT Crowd Full Stack Challenge - Lautaro Figueroa
      </Heading>
      {loading && <Loading />}
      <Box m={10}>
        <div style={{ marginLeft: 32 }}>
          <SearchBar setQuery={setQuery} />

          <Button colorScheme="blue" mt="4" size="sm">
            <Link href={`/favorites`}>Show my favorites</Link>
          </Button>
        </div>
        <Flex w="100%" direction={{ base: "column-reverse", md: "row" }} mt={4}>
          {games.length ? (
            <Box w={{ base: "100%", lg: "70%" }} px={{ base: 2, lg: 8 }}>
              <Flex flexWrap="wrap" justifyContent="space-between">
                <GameList games={games} setFavorites={setFavorites} />
              </Flex>
            </Box>
          ) : (
            <Text m="5 " w="100%" fontSize={"2xl"} textAlign="center">
              There are no games available
            </Text>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flex: 1,
              position: "relative",
            }}
          >
            <Text
              textAlign="center"
              m="2"
              fontSize="2xl"
              fontWeight="bold"
              style={{ position: "absolute", top: -50 }}
            >
              Top 10 games
            </Text>
            <Sidebar />
          </div>
        </Flex>
      </Box>
    </>
  );
};

export default Home;
