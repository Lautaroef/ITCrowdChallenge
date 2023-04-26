import type { Game } from "../../../../types/Game";
import type { Dispatch, SetStateAction } from "react";

import Link from "next/link";
import { Box, GridItem, Heading, Text } from "@chakra-ui/react";
import ShowFavButton from "./ShowFavButton";

type Props = {
  game: Game;
  setFavorites: Dispatch<SetStateAction<Game[]>>;
};

function GameDetails({ game, setFavorites }: Props) {
  return (
    <Link href={`/game/${game.id}`}>
      <a>
        <GridItem key={game.id}>
          <Box
            border="1px"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
            h="100%"
            _hover={{ bgColor: "#f7fafc" }}
          >
            <Heading as="h3" size="md" mb={2}>
              <a>{game.title}</a>
            </Heading>
            <Text mb={2}>Approval Rating: {game.approvalRating}%</Text>
            <Text mb={2}>Total Reviews: {game.totalReviews}</Text>
            <Text mb={2}>Top Critic Average Score: {game.topCriticAvgScore?.toFixed(1)}</Text>
            <Text>Category: {game.category}</Text>
            <ShowFavButton game={game} setFavorites={setFavorites} />
          </Box>
        </GridItem>
      </a>
    </Link>
  );
}

export default GameDetails;
