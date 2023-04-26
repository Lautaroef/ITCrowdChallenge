import useTopGames from "@/hooks/useTopGames";

import TopGameDetailsCard from "./TopGameDetailsCard";
import { Box, Flex, Text } from "@chakra-ui/react";

const Sidebar = (): JSX.Element | null => {
  const topGames = useTopGames();

  if (!topGames.length) {
    return (
      <Text textAlign="center" fontSize="xl" mt={4}>
        You have no favorites
      </Text>
    );
  }

  return (
    <Box w={"100%"} border="1px solid #e2e8f0" padding="0.5rem 1rem" flex={1}>
      <Flex
        overflowX={{ base: "scroll", md: "hidden" }}
        direction={{ base: "row", md: "column" }}
        gap="2"
        align="flex-start"
        flex={1}
      >
        {topGames.map((game) => (
          <TopGameDetailsCard game={game} key={game.id} />
        ))}
      </Flex>
    </Box>
  );
};

export default Sidebar;
