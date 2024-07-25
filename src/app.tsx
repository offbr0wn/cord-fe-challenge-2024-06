import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import SideNavBar from "./components/sidenavbar";

import Discover from "./pages/discover";

import "./css/app.css";

export default function App(props: React.JSX.IntrinsicAttributes) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
      <PageContainer>
        <SideNavBar isOpen={isOpen} setIsOpen={setIsOpen} {...props} />
        <ContentWrapper>
          <Routes>
            <Route
              path="/discover"
              element={
                <Discover isOpen={isOpen} setIsOpen={setIsOpen} {...props} />
              }
              {...props}
            />
          </Routes>
        </ContentWrapper>
      </PageContainer>
    </Router>
  );
}

const ContentWrapper = styled.main`
  padding-left: 260px;
  @media (max-width: 600px) {
    padding-left: 0;
  }
`;

const PageContainer = styled.main`
  overflow-x: hidden;
`;
