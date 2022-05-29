import React from "react";
import "./App.css";
import styled from "styled-components";
import Form from "./components/form";
import Userpage from "./components/userpage";

function App() {
  return (
    <Page>
      <Wrapper>
        <Form />
      </Wrapper>
      <Wrapper>
        <Userpage />
      </Wrapper>
    </Page>
  );
}

export default App;

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 80vw;
  height: 40vh;
  background: pink;
  padding: 10px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  margin-top: 20px;
  @media screen and (max-width: 768px) {
    width: 80vw;
  }
`;
