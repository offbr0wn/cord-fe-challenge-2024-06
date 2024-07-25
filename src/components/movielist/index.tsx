import React from "react";
import styled from "styled-components";

import MovieItem from "../movieitem";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieListProps {
  movies: Movie[];
  genres: string;
}

export default function MovieList({ movies, genres }: MovieListProps) {
  return (
    <MoviesWrapper>
      {/* Iterates through the movies array and passes it to the MovieItem component */}

      {movies.map((movie, index) => (
        <MovieItem index={index} movies={movie} genres={genres} />
      ))}
    </MoviesWrapper>
  );
}

const MoviesWrapper = styled.div`
  position: relative;
  display: inline-grid;
  gap: 20px;
`;
