import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import SearchArea from "../components/SearchArea";
import SearchAreaCollege from "../components/SearchAreaCollege";
import StudentList from "../components/StudentList";

const Container = styled.div`
  background: #f5f5f5;
  min-height: 100vh;
`;

const Home = () => {
  const location = useLocation();
  const [id, setid] = useState([]);

  // useEffect(() => {
  //   setid(location.state && location.state.id);
  //   console.log(id);
  //   localStorage.setItem("ids", JSON.stringify(id));

  //   // if (id && id.length > 0) {
  //   //   localStorage.setItem("ids", JSON.stringify(id));
  //   // } else if (id && id.length === 0) {
  //   //   localStorage.setItem("ids", 123);
  //   // }

  //   console.log(localStorage.ids && localStorage.ids);
  // }, [location.state?.id]);

  const [role, setrole] = useState(1);

  // console.log(location.state && location.state.id);
  return (
    <Container>
      <Navbar role={true} />
      {role === 1 ? <SearchArea /> : <SearchAreaCollege />}
      <StudentList id={location.state && location.state.id} />
    </Container>
  );
};

export default Home;
