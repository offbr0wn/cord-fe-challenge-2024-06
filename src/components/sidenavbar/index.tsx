import React from "react";
import styled from "styled-components";
import { NavLink as Link, useLocation } from "react-router-dom";

import * as colors from "../../colors";
import Arrow from "../../images/arrow-icon.png";
import SearchWhite from "../../images/search-icon-white.png";

export interface SideNavBarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function SideNavBar({ isOpen, setIsOpen }: SideNavBarProps) {
  const location = useLocation();

  /* Write the necessary functions to show/hide the side bar on mobile devices */

  return (
    <SideNavBarCont className={isOpen ? "visible" : ""}>
      {/* A hamburger icon slide in effect for mobile devices */}
      <CloseButton onClick={() => setIsOpen(!isOpen)}>×</CloseButton>
      <SideNavContent>
        <SideNavMainLink
          className="menu_nav_link main_nav_link"
          to="/"
          // activeClassName="active"
        >
          Wesley
          {/* Add types for the props of 'NavIcon' */}
          <NavIcon>
            <img src={Arrow} alt="Arrow Icon" />
          </NavIcon>
        </SideNavMainLink>
        <SideNavMainLink
          className="menu_nav_link"
          to="/discover"
          isActive={location.pathname === "/discover"}
          // activeClassName="active"
        >
          Discover
          <NavIcon>
            <img src={SearchWhite} alt="Search Icon" />
          </NavIcon>
        </SideNavMainLink>
        <SideNavHeader>
          <HeaderText>Watched</HeaderText>
        </SideNavHeader>
        <NavLink
          className="menu_nav_link"
          to="/watched/movies"
          isActive={location.pathname === "/watched/movies"}
          // activeClassName="active"
        >
          Movies
        </NavLink>
        <NavLink
          className="menu_nav_link"
          to="/watched/tv-shows"
          // activeClassName="active"
          isActive={location.pathname === "/watched/tv-shows"}
        >
          Tv Shows
        </NavLink>
        <SideNavHeader>
          <HeaderText>Saved</HeaderText>
        </SideNavHeader>
        <NavLink
          className="menu_nav_link"
          to="/saved/movies"
          // activeClassName="active"
          isActive={location.pathname === "/saved/movies"}
        >
          Movies
        </NavLink>
        <NavLink
          className="menu_nav_link"
          to="/saved/tv-shows"
          // activeClassName="active"
          isActive={location.pathname === "/saved/tv-shows"}
        >
          Tv Shows
        </NavLink>
      </SideNavContent>
    </SideNavBarCont>
  );
}

const SideNavBarCont = styled.div`
  position: fixed;
  z-index: 9;
  width: 260px;
  height: 100%;
  background-color: ${colors.sideNavBar};

  &.visible {
    transform: translateX(0);
  }

  @media (max-width: 600px) {
    transform: translateX(-260px);
    transition: transform 0.3s ease;
  }
`;

const CloseButton = styled.button`
  position: absolute;

  background: none;

  z-index: 5;
  border: none;
  font-size: 2em;
  color: white;
  cursor: pointer;
  @media (min-width: 600px) {
    display: none;
  }
`;

const SideNavMainLink = styled(Link)<{ isActive?: boolean }>`
  position: relative;
  display: flex;
  padding: 25px 35px;
  font-size: 1.6em;
  font-weight: 700;
  color: white;
  background-color: ${(props) =>
    props.isActive ? `${colors.primaryColor}` : "inherit"};
`;

const NavIcon = styled.div`
  position: absolute;
  right: 35px;
  align-self: center;
  bottom: 25%;
`;

const SideNavHeader = styled.div`
  padding: 25px 35px;
  font-size: 1.5em;
  font-weight: 400;
  color: white;
  padding-right: 0;
`;

const HeaderText = styled.div`
  &::after {
    content: "";
    display: block;
    height: 1px;
    background-color: gray;
    margin-top: 5px;
  }
`;

const NavLink = styled(Link)<{ isActive?: boolean }>`
  display: block;
  padding: 10px 35px;
  color: white;
  font-weight: 100;
  background-color: ${(props) =>
    props.isActive ? `${colors.primaryColor}` : "inherit"};
`;

const SideNavContent = styled.div`
  color: ${colors.sideNavBar};
`;
