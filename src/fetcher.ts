import axios from "axios";

// All of your API requests should be in this file
// i.e.
const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YmFiOTM5ZGM5OWRkM2Y1MzQ4MmQ3ZTNjMWRjMTgwYiIsIm5iZiI6MTcyMTc1NzgxMy4zOTc3ODMsInN1YiI6IjYxODMxZGM4ZTc0MTQ2MDA0Mzg4ZGQyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0Wa03faMyau6zGtRtwHz1YBL1YuwWMJ4p0zmPGnNP5Q";

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${apiKey}`,
};

export const getMovieGenres = async (language?: string) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?language=${language}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching data", error);
  }
};

export const getMovieGenreIDs = async () => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list",
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching data", error);
  }
};

export const getSearchMovies = async (keyword: string, year: number) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${keyword}&year=${year}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching data", error);
  }
};
