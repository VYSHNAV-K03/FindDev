import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { apiUrl } from "../data/api";
import profile1 from "../assets/profile_dummy/profile1.png";
import { Buffer } from "buffer";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background: blue;
  .logo {
    font-size: 2rem;
    font-weight: bold;
    color: #fff;
    display: flex;
    margin-right: auto;
  }
  .login_status {
    display: flex;
    margin-right: 10px;
    background: #fff;
    border-radius: 30px;
    padding: 5px 10px;
    align-items: bottom;
    justify-content: center;
  }
  .login_status li {
    list-style: none;
    text-align: center;
    font-weight: bold;
    font-size: 0.8rem;
    margin: auto;
    display: flex;
    align-items: center;
  }
  .login_status li p {
    display: flex;
    align-items: center;
    color: blue;
    margin: auto;
  }
  .profile {
    display: flex;
    margin-right: 100px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: black;
  }
  @media screen and (max-width: 940px) {
    .profile {
      margin-right: 10px;
    }
  }
  .profile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid #fff;
  }
`;

const Navbar = () => {
  const [login, setlogin] = useState(true);
  const [profileimg, setprofileimg] = useState();

  const navigate = useNavigate();

  const callNavbar = async () => {
    try {
      const res = await axios.get(apiUrl + `/getData`, {
        withCredentials: true,
      });

      const data = res.data;

      if (data.Role === 0) {
        navigate("/profile");
      }
      // console.log(data);

      // setprofilepath(data.profile);
      // setsocialprofile(data.socialProfile);
      // setuser(data);
      setprofileimg(data.profile && data.profile);

      setlogin(false);
      if (res.status !== 200) {
        throw new Error(res.error);
      }
    } catch (e) {
      console.log("error", e);
      setlogin(true);
      navigate("/login");
    }
  };

  // console.log(login);

  useEffect(() => {
    callNavbar();
  }, []);

  return (
    <>
      <Container>
        <div className="logo">OneTouch</div>
        <div className="login_status">
          {login ? (
            <li>
              <NavLink
                to="/login"
                className="register-toggle"
                style={{ textDecoration: "none", color: "white" }}
              >
                <p>SignIn</p>
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink
                to="/logout"
                style={{ textDecoration: "none", color: "white" }}
              >
                <p>Sign Out</p>
              </NavLink>
            </li>
          )}
        </div>
        {login ? (
          <></>
        ) : (
          <div className="profile">
            <img
              src={
                profileimg
                  ? `data:${profileimg.contentType};base64, ${Buffer.from(
                      profileimg.data.data
                    ).toString("base64")}`
                  : profile1
              }
              alt="profile"
            />
          </div>
        )}
      </Container>
    </>
  );
};

export default Navbar;
