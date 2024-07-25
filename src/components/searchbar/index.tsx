import { css, styled } from "styled-components";
import * as colors from "../../colors";

interface SearchBarProps {
  placeholder: string;
  type: string;
  iconImage: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({
  placeholder,
  type,
  iconImage,
  onChange,
}: SearchBarProps) {
  return (
    <FiltersWrapper>
      <SearchIcon src={iconImage} alt="Search Icon" />
      <SearchInput
        id="search-input"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </FiltersWrapper>
  );
}

const FiltersWrapper = styled.div`
  display: flex;
  align-items: center;

  position: relative;

  margin-bottom: 20px;
  border-bottom: 2px solid #d2ce1a;
  @media (max-width: 600px) {
    flex: 0.9;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  padding-right: 10px;
  color: #d2ce1a;
  width: 20px;
`;
const SearchInput = styled.input`
  ${(props) =>
    props.type === "text" &&
    css`
      font-weight: bold;
    `}
  ${(props) =>
    props.type === "number" &&
    css`
      font-weight: normal;
    `}
  font-size: 18px;

  color: ${colors.primaryColor};
  border: none;
  background-color: transparent;
  outline: none;
  padding-left: 25px;

  text-align: left;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* For Firefox */
  -moz-appearance: textfield;

  &::placeholder {
    color: #d2ce1a;
  }
`;
