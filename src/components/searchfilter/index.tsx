import React, { useState } from "react";
import styled from "styled-components";

import ExpandableFilters from "../expandablefilters";
import SearchBar from "../searchbar";
import SearchIconYellow from "../../images/search-icon-yellow.png";
import CalendarIcon from "../../images/year-icon.png";
import FilterIconImage from "../../images/filter-icon.png";
interface SearchFiltersProps {
  // genres, ratings, languages, searchMovies
  searchMovies: (keyword: string, year: number) => void;
  genres: string[];
  ratings: { id: number; name: number }[];
  languages: { id: string; name: string }[];
}

export default function SearchFilters({
  genres,
  ratings,
  languages,
  searchMovies,
}: SearchFiltersProps) {
  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState("");

  // Function to store prev states of either inputs fields making sure prev states are not overwritten
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    searchMovies(e.target.value, parseInt(year) || 0);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
    searchMovies(keyword, parseInt(e.target.value) || 0);
  };

  return (
    <FiltersWrapper>
      <SearchFiltersCont className="search_inputs_cont">
        {/* A SearchBar component and use it for both the keyword and the year inputs */}

        <SearchBar
          placeholder="Search for movies"
          iconImage={SearchIconYellow}
          type="text"
          onChange={handleKeywordChange}
        />
        <SearchBarMobile>
          <SearchBar
            placeholder="Year of release"
            iconImage={CalendarIcon}
            type="number"
            onChange={handleYearChange}
          />
        </SearchBarMobile>
        <FilterIcon src={FilterIconImage} alt="Filter" />
      </SearchFiltersCont>
      {/* Expandable dropdown filters  and when in mobile view not shown*/}
      <MobileSearchFiltersCont>
        <SearchFiltersCont>
          <CategoryTitle>Movies</CategoryTitle>
          {/* A component called "ExpandableFilters" and  it used for  filtering through categories */}
          <ExpandableFilters
            languages={languages}
            ratingOptions={ratings}
            genreOptions={genres}
          />
        </SearchFiltersCont>
      </MobileSearchFiltersCont>
    </FiltersWrapper>
  );
}

const FiltersWrapper = styled.div`
  position: relative;
`;

const SearchFiltersCont = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 3px;
  transition: all 0.3s ease-in-out;
  margin-bottom: 15px;

  @media (max-width: 600px) {
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    padding-right: 0;
    flex-wrap: nowrap;
    margin-bottom: 0;
  }
`;

const CategoryTitle = styled.div`
  font-weight: bold;
`;

const MobileSearchFiltersCont = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
`;

const SearchBarMobile = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
`;

const FilterIcon = styled.img`
  @media (min-width: 600px) {
    display: none;
  }

  @media (max-width: 600px) {
    margin-left: 0;
    margin-top: 10px;
    color: #d5d84a;
    margin-left: 10px;
    margin-bottom: 20px;
    border-bottom: 2px solid #d2ce1a;
    width: 30px;
    cursor: pointer;
    padding-bottom: 5px;
  }
`;
