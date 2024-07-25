import React from "react";
import styled from "styled-components";
import * as colors from "../../colors";

export default function MovieItem({
  movies,
  genres,
  index,
}: {
  movies: {
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
  };
  genres: string;
  index: number;
}) {
  // Url for image
  const imageURL = (url: string) => `https://image.tmdb.org/t/p/w500/${url}`;

  //  Takes genre id of each movie compares with the genre list to match id to name
  const genreNames = movies.genre_ids
    .map((id: number) => genres[id] || "Unknown Genre")
    .join(" | ");

  return (
    // All props passed into MovieItem component to display info
    <MovieItemWrapper>
      <LeftCont>
        <Image src={imageURL(movies.poster_path)} alt="Bad Genius" />
      </LeftCont>
      <RightCont>
        <CardWrapper>
          {/* Rounds to 1 d.p */}
          <Rating>{movies.vote_average.toFixed(1)}</Rating>
        </CardWrapper>
        <Title>{movies.title}</Title>
        <Genres>{genreNames}</Genres>
        <Description>{movies.overview}</Description>
        <Date>{movies.release_date}</Date>
      </RightCont>
    </MovieItemWrapper>
  );
}

const MovieItemWrapper = styled.div`
  position: relative;
  background-color: white;
  border-radius: 3px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const LeftCont = styled.div`
  display: inline-block;
  flex: 0.3;
`;

const RightCont = styled.div`
  display: inline-block;
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const Title = styled.h2`
  font-size: 1.5em;
  margin: 0;
  color: #222;
`;

const Genres = styled.div`
  font-size: 0.9em;
  color: ${colors.primaryColor};
  font-weight: bold;
  margin: 10px 0;
`;

const Description = styled.p`
  font-size: 0.9em;
  color: ${colors.fontColor};
  font-weight: 600;
  padding-top: 0;
`;

const Date = styled.div`
  font-size: 0.8em;
  color: ${colors.primaryColor};
  margin-top: 10px;
`;

const Rating = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #dff53e;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  color: white;
`;

const CardWrapper = styled.div`
  position: relative;
`;
