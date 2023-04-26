import axiosInstance from "./axiosInstance";

const fetchGames = async (query: string) => {
  try {
    const { data } = await axiosInstance.get(query);
    return data || [];
  } catch (error) {
    return [];
  }
};

export default fetchGames;
