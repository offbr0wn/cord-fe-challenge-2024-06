import React, { useState } from "react";
import styled from "styled-components";

import CheckBox from "../checkbox";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  expanded?: boolean;
  toggleExpand: () => void;
}

interface ExpandableFiltersProps {
  languages: { id: string; name: string }[];
  ratingOptions: { id: number; name: number }[];
  genreOptions: string[];
}

export default function ExpandableFilters({
  languages,
  ratingOptions,
  genreOptions,
}: ExpandableFiltersProps) {
  // state to keep track of which filters are expanded
  const [filtersShown, setFiltersShown] = useState({
    genresExpanded: false,
    voteExpanded: false,
    languageExpanded: false,
  });

  const { genresExpanded, voteExpanded, languageExpanded } = filtersShown;
  console.log(Object.values(genreOptions));

  const FilterSection = ({
    title,
    children,
    expanded,
    toggleExpand,
  }: FilterSectionProps) => (
    <>
      <CategoryHeader onClick={toggleExpand}>
        {title}
        <Icon>{expanded ? "-" : "+"}</Icon>
      </CategoryHeader>
      <FilterContent expanded={expanded}>{children}</FilterContent>
    </>
  );

  return (
    <FilterWrapper>
      <FilterSection
        title="Select genre(s)"
        expanded={genresExpanded}
        toggleExpand={() =>
          setFiltersShown({
            ...filtersShown,
            genresExpanded: !genresExpanded,
          })
        }
      >
        {/* Turn genreOptions into an array */}
        {Object.values(genreOptions).map((genre) => (
          <CheckBox key={genre} id={genre} name={genre} label={genre} />
        ))}
      </FilterSection>

      <FilterSection
        title="Select min. vote"
        expanded={voteExpanded}
        toggleExpand={() =>
          setFiltersShown({
            ...filtersShown,
            voteExpanded: !voteExpanded,
          })
        }
      >
        {ratingOptions.map((vote) => (
          <CheckBox
            key={vote.id}
            id={`min-vote-${vote.id}`}
            name={`min-vote-${vote.name}`}
            label={vote.name.toString()}
          />
        ))}
      </FilterSection>

      <FilterSection
        title="Select language"
        expanded={languageExpanded}
        toggleExpand={() =>
          setFiltersShown({
            ...filtersShown,
            languageExpanded: !languageExpanded,
          })
        }
      >
        {languages.map((language) => (
          <CheckBox
            key={language.id}
            id={language.id}
            name={language.name}
            label={language.name}
          />
        ))}
      </FilterSection>
    </FilterWrapper>
  );

  // You need to create your own checkbox component with a custom checkmark
}

// Styled components
const FilterWrapper = styled.div`
  width: 300px;
  font-family: Arial, sans-serif;
`;

// const FilterHeader = styled.div`
//   font-size: 1.2em;
//   font-weight: bold;
//   margin-bottom: 10px;
// `;

const FilterContent = styled.div`
  display: ${(props) => (props.expanded ? "block" : "none")};
  margin-left: 20px;
  transition: max-height 0.3s ease-in-out;
  overflow: hidden;
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  margin: 10px 0;
`;

const Icon = styled.span`
  font-size: 1.5em;
`;
