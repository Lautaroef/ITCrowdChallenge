import type { Game } from "../../../../../types/Game";
import Link from "next/link";
import { Box, Heading, Text } from "@chakra-ui/react";

function TopGameDetailsCard({ game }: { game: Game }) {
  return (
    <Box
      textAlign={{ md: "left", base: "center" }}
      p={3}
      borderRadius={4}
      border="1px solid #e2e8f0"
      h="100%"
      w="100%"
      _hover={{ border: "1px solid #cbd5e0" }}
    >
      <Link href={`/game/${game.id}`}>
        <a>
          <Heading as="h2" size="sm" mb={2}>
            {game.title}
          </Heading>
          <Text mb={1} fontSize="small">
            Percent Recommended: {game.approvalRating}%
          </Text>
          <Text mb={1} fontSize="small">
            Number of Reviews: {game.totalReviews}
          </Text>
          <Text mb={1} fontSize="small">
            Top Critic Score: {game.topCriticAvgScore}
          </Text>
          <Text fontSize="small">Tier: {game.category}</Text>
        </a>
      </Link>
    </Box>
  );
}

export default TopGameDetailsCard;
