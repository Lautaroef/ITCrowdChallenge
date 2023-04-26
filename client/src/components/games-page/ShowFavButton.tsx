import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

import type { Game } from "../../../../types/Game";
import {
  addGameToFavorites,
  getFavoriteGames,
  isGameInFavorites,
  removeGameFromFavorites,
} from "@/helpers/manageFavorites";

type Props = {
  game: Game;
  setFavorites: Dispatch<SetStateAction<Game[]>>;
};

const ShowFavButton = ({ game, setFavorites }: Props) => {
  const [exists, setExists] = useState<boolean | null>(isGameInFavorites(game));

  const handleAddToFav = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // As the div that wraps the button has a click event listener, we need to stop the event from bubbling up
    e.stopPropagation();
    e.preventDefault();

    addGameToFavorites(game);
    setFavorites(getFavoriteGames() as Game[]);
    setExists(true);
  };

  const handleRemoveFromFav = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    removeGameFromFavorites(game);
    setFavorites(getFavoriteGames() as Game[]);
    setExists(false);
  };

  useEffect(() => {
    setExists(isGameInFavorites(game) as boolean);
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {exists ? (
        <Button
          onClick={handleRemoveFromFav}
          mt={2}
          size="xs"
          colorScheme={"red"}
          zIndex={999}
        >
          Remove from favorites
        </Button>
      ) : (
        <Button onClick={handleAddToFav} mt={2} size="xs" colorScheme={"blue"} zIndex={999}>
          Add to favorites
        </Button>
      )}
    </>
  );
};
export default ShowFavButton;
