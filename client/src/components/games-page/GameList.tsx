import type { Dispatch, FunctionComponent, SetStateAction } from "react";
import { Grid } from "@chakra-ui/react";

import type { Game } from "../../../../types/Game";
import GameDetails from "./GameDetails";

type Props = {
  games: Game[];
  setFavorites: Dispatch<SetStateAction<Game[]>>;
};

const GameList: FunctionComponent<Props> = ({ games, setFavorites }) => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        xl: "repeat(3, 1fr)",
      }}
      gap={6}
    >
      {games.map((game) => (
        <GameDetails key={game.id} game={game} setFavorites={setFavorites} />
      ))}
    </Grid>
  );
};

export default GameList;
