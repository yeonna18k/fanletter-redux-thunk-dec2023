import React from "react";
import Tabs from "./Tabs";
import NavBar from "./NavBar";
import styled from "styled-components";
import { Navigate } from "react-router-dom";

function Header() {
  return (
    <Container>
      <NavBar />
      <Title>RedVelvet</Title>
      <Tabs />
    </Container>
  );
}
const Container = styled.section`
  width: 100%;
  height: 300px;
  background-color: lightpink;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const Title = styled.h1`
  font-family: "Qwigley", cursive;
  font-size: 72px;
  font-weight: 700;
  flex: 1;
  display: flex;
  align-items: center;
`;

export default Header;
