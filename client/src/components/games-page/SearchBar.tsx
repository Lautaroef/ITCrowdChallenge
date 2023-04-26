import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  setQuery: Dispatch<SetStateAction<string>>;
};

function SearchBar({ setQuery }: Props) {
  const [search, setSearch] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup size="md">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search a game..."
        />

        <InputRightElement width="4.5rem" mr="2">
          <Button h="1.75rem" size="md" type="submit">
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  );
}
export default SearchBar;
