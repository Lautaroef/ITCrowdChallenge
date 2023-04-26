import type { Game } from "../../../../types/Game";
import { useCallback, useState, useEffect } from "react";
import {
  addGameToFavorites,
  isGameInFavorites,
  removeGameFromFavorites,
} from "@/helpers/manageFavorites";
import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";

type Props = {
  game: Game;
};

const GameDetails: React.FC<Props> = ({ game }) => {
  const [exist, setExist] = useState(() => isGameInFavorites(game));

  const handleRemoveFromFavorites = useCallback(() => {
    removeGameFromFavorites(game);
    setExist(isGameInFavorites(game));
  }, [game]);

  const handleAddToFavorites = useCallback(() => {
    addGameToFavorites(game);
    setExist(isGameInFavorites(game));
  }, [game]);

  useEffect(() => {
    setExist(isGameInFavorites(game));
  }, [game]);
  const {
    title,
    firstReleaseDate,
    topCriticAvgScore,
    category,
    approvalRating,
    totalReviews,
    url,
  } = game;

  return (
    <Box
      maxW="lg"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      m="4"
      margin="auto"
    >
      <Flex justify="space-between" p="4">
        <Flex direction="column">
          <Text fontWeight="bold" fontSize="xl">
            {title}
          </Text>
          <Text fontSize="md">
            Released on {new Date(firstReleaseDate).toLocaleDateString()}
          </Text>
        </Flex>
        <Text fontSize="lg" textAlign="right">
          Top score : <b>{topCriticAvgScore.toFixed(1)}</b>
        </Text>
      </Flex>

      <Box p="6">
        <Flex justify="space-between" mb="2">
          <Text fontWeight="bold">Tier:</Text>
          <Text>{category}</Text>
        </Flex>

        <Flex justify="space-between" mb="2">
          <Text fontWeight="bold">Approval rating:</Text>
          <Text>{approvalRating}%</Text>
        </Flex>

        <Flex justify="space-between" mb="2">
          <Text fontWeight="bold">Total reviews:</Text>
          <Text>{totalReviews}</Text>
        </Flex>

        <Link href={url} color="blue.500" isExternal fontWeight="bold" textAlign="right">
          Read more on OpenCritic
        </Link>
        <br />
        {exist ? (
          <Button onClick={handleRemoveFromFavorites} mt={2} size="xs" colorScheme="red">
            Remove from favorite
          </Button>
        ) : (
          <Button onClick={handleAddToFavorites} mt={2} size="xs" colorScheme="blue">
            Add to favorite
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default GameDetails;
