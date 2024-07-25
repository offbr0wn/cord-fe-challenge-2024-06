import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as colors from "../../colors";

import SearchFilters from "../../components/searchfilter";
import MovieList from "../../components/movielist";
import HamBurgerIcon from "../../images/Hamburger_icon.png";

import {
  getMovieGenreIDs,
  getMovieGenres,
  getSearchMovies,
} from "../../fetcher";
import { SideNavBarProps } from "../../components/sidenavbar";

export default function Discover({ isOpen, setIsOpen }: SideNavBarProps) {
  // Preloads the popular movies when page loads & get the movie genres
  useEffect(() => {
    preLoadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState({
    keyword: "",
    year: 0,
    results: [],
    movieDetails: null,
    totalCount: 0,
    genreOptions: [],
    ratingOptions: [
      { id: 7.5, name: 7.5 },
      { id: 8, name: 8 },
      { id: 8.5, name: 8.5 },
      { id: 9, name: 9 },
      { id: 9.5, name: 9.5 },
      { id: 10, name: 10 },
    ],
    languageOptions: [
      { id: "fr", name: "French" },
      { id: "en", name: "English" },
      { id: "ru", name: "Russian" },
      { id: "it", name: "Italian" },
    ],
  });

  // function to preload the popular movies when page loads & get the movie genres
  const preLoadMovies = async () => {
    const movieDetails = await getMovieGenres();
    const genreOptions = await getMovieGenreIDs();

    const findID = movieDetails.results.map(
      (id: { genre_ids: number[] }) => id.genre_ids
    );

    const genreLookup = genreOptions.genres.reduce(
      (
        acc: { [x: string]: any },
        genre: { id: string | number; name: any }
      ) => {
        acc[genre.id] = genre.name;
        return acc;
      },
      {}
    );

    const filmsWithGenreNames: string[] = findID.map(
      (genreIds: number[]): string =>
        genreIds.map((id: number) => genreLookup[id] || "Unknown").join(" | ")
    );

    setState({
      ...state,
      genreOptions: genreLookup,
      results: movieDetails.results,
      totalCount: movieDetails.total_results,
    });
  };

  // Function used to search keyword of film and year from search component.
  const searchMovies = async (keyword: string, year: number) => {
    const querySearchMovies = await getSearchMovies(keyword, year);

    setState({ ...state, results: querySearchMovies.results, keyword });
  };

  const { genreOptions, languageOptions, ratingOptions, totalCount, results } =
    state;

  return (
    <DiscoverWrapper>
      <MobileHeadingWrapper>
        <HamburgerIcon onClick={() => setIsOpen(!isOpen)}>
          <img src={HamBurgerIcon} alt="Arrow Icon" />
        </HamburgerIcon>
        <MobilePageTitle>Discover</MobilePageTitle>
      </MobileHeadingWrapper>
      <GridWrapper>
        <MovieResults>
          {totalCount > 0 && <TotalCounter>{totalCount} results</TotalCounter>}
          <MovieList movies={results || []} genres={genreOptions || []} />
          {/* Each movie must have a unique URL and if clicked a pop-up should appear showing the movie details and the action buttons as shown in the wireframe */}
        </MovieResults>
        {/* Search and expand filter on the right */}
        <MovieFilters>
          <SearchFilters
            genres={genreOptions}
            ratings={ratingOptions}
            languages={languageOptions}
            searchMovies={(keyword: string, year: number) =>
              searchMovies(keyword, year)
            }
          />
        </MovieFilters>
      </GridWrapper>
    </DiscoverWrapper>
  );
}

const DiscoverWrapper = styled.div`
  padding: 60px 35px;
  background-color: ${colors.lightBackground};

  padding: 45px;

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const MobileHeadingWrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  @media (min-width: 600px) {
    display: none;
  }
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr; /* 3 parts for content, 1 part for sidebar */
  gap: 20px; /* Adjust the gap between the columns */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 600px) {
    padding: 0;
  }
`;

const TotalCounter = styled.div`
  font-weight: 400;
  padding-bottom: 20px;
  @media (max-width: 600px) {
    padding-bottom: 10px;
  }
`;

const MovieResults = styled.div`
  gap: 20px;
  @media (max-width: 600px) {
    order: 2;
  }
`;

const MovieFilters = styled.div`
  padding-top: 40px;
  @media (max-width: 600px) {
    padding-top: 0px;
    order: 1;
  }
`;

const MobilePageTitle = styled.header`
  color: ${colors.fontColor};
  font-size: 2em;
  font-weight: 700;
`;

const HamburgerIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 700;
  padding-top: 5px;

  img {
    width: 30px;
    height: 30px;
  }

  @media (min-width: 600px) {
    display: none;
  }
`;
