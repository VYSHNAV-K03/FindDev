import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../data/api";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(apiUrl + `/signout`, {
        withCredentials: true,
      })
      .then((res) => {
        navigate("/login", { replace: true });
        if (res.status !== 200) {
          throw new Error(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <>Logout page</>;
};

export default Logout;
