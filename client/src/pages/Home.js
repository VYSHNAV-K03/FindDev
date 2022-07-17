import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import SearchArea from "../components/SearchArea";
import StudentList from "../components/StudentList";

const Container = styled.div``;

const Home = () => {
  const location = useLocation();

  const [id, setid] = useState();

  // console.log(location.state && location.state.id);
  return (
    <Container>
      <Navbar />
      <SearchArea />
      <StudentList id={location.state && location.state.id} />
    </Container>
  );
};

export default Home;
