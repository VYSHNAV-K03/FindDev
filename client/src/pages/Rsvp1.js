import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { apiUrl } from "../data/api";

const Container = styled.div``;

const Rsvp1 = () => {
  const navigate = useNavigate();

  const callNavbar = async () => {
    try {
      const res = await axios.get(apiUrl + `/getData`, {
        withCredentials: true,
      });

      const data = res.data;

      if (data.Role != 0) {
        navigate("/login");
      }

      if (res.status !== 200) {
        throw new Error(res.error);
      }
    } catch (e) {
      console.log("error", e);
      navigate("/login_rsvp");
    }
  };

  useEffect(() => {
    callNavbar();
  }, []);

  return (
    <Container>
      company selected you <button>confirm</button>
    </Container>
  );
};

export default Rsvp1;
