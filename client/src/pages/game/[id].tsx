import type { Game } from "../../../../types/Game";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";

import axiosInstance from "@/helpers/axiosInstance";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import GameDetails from "@/components/game-page/GameCard";

type Props = {
  game: Game;
};
const Game: NextPage<Props> = ({ game }) => {
  const router = useRouter();

  return (
    <div>
      <Box m="5">
        <Button leftIcon={<ArrowBackIcon />} size="sm" onClick={router.back}></Button>
        {game ? (
          <GameDetails game={game} />
        ) : (
          <Text fontSize="xl" fontWeight="bold" mt={4}>
            Game not found. Please check the game ID or try another game.
          </Text>
        )}
      </Box>
    </div>
  );
};

export default Game;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  try {
    const response = await axiosInstance.get(`/game/${id}`);
    const game = response.data;
    return {
      props: { game },
    };
  } catch (error) {
    return {
      props: { game: null },
    };
  }
}
