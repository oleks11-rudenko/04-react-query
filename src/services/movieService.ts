import axios from "axios";
import type { Movie } from "../types/movie";

axios.defaults.baseURL = "https://api.themoviedb.org/3/search/movie";
const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

interface MoviesHttpResponse {
  results: Movie[];
  total_pages: number;
}

export async function fetchMovies(
  query: string,
  page: number
): Promise<MoviesHttpResponse> {
  const response = await axios.get<MoviesHttpResponse>("", {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
}
