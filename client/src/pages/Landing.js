import React from "react";
import styled from "styled-components";
import profile1 from "../assets/profile_dummy/profile1.png";
import image from "../assets/form/Online world-cuate.svg";

const Container = styled.div`
  min-height: 100vh;
  position: relative;
  .main_logo {
    position: absolute;
    width: 507px;
    height: 504px;
    right: 150px;
    top: 78px;
    z-index: -1;
  }
  .placement_quote {
    position: absolute;
    right: 250px;
    top: 576px;

    z-index: -1;

    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 19px;
    line-height: 23px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;

    color: rgba(0, 0, 0, 0.75);
  }
  .main_logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .navbar {
    padding: 20px;
    display: flex;
    align-items: center;

    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }
  .logo_nav {
    margin-right: auto;

    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 29px;
    line-height: 35px;
    display: flex;
    align-items: center;

    color: #000000;
  }
  .home_nav,
  .services_nav,
  .help_nav {
    margin-right: 30px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 30px;
    display: flex;
    align-items: center;

    color: #000000;
  }

  .profile_nav {
    margin-right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: grey;

    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
  .profile_nav img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .home {
    padding: 100px 200px;
    min-height: 70vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  @media screen and (max-width: 1327px) {
    .home {
      padding: 100px 50px;
    }
    .main_logo {
      position: absolute;
      width: 507px;
      height: 504px;
      right: 50px;
      top: 78px;
    }
    .placement_quote {
      position: absolute;
      right: 150px;
      top: 576px;

      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 19px;
      line-height: 23px;
      display: flex;
      align-items: center;
      text-align: center;
      letter-spacing: 0.04em;

      color: rgba(0, 0, 0, 0.75);
    }
  }

  .Quote_home {
    list-style: none;

    font-family: "Montserrat";
    font-style: normal;
    font-weight: 800;
    font-size: 50px;
    line-height: 61px;
    letter-spacing: 0.04em;

    text-shadow: 0px 0px 113px rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
  }
  .Quote_home li {
    margin-bottom: 10px;
  }
  .desc_home {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 27px;
    line-height: 33px;
    display: flex;
    align-items: center;
    letter-spacing: 0.04em;

    color: rgba(0, 0, 0, 0.75);

    margin-bottom: 70px;
  }
  .get_start_home {
    width: 258px;
    height: 58px;
    background: #000698;
    border-radius: 9px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;
    display: flex;
    align-items: center;
    letter-spacing: 0.04em;

    color: #ffffff;

    border: none;
    outline: none;
    padding: 10px;
  }
  @media screen and (max-width: 959px) {
    .home {
      padding: 100px 50px;
    }
    .main_logo {
      width: 307px;
      height: 304px;
      right: 50px;
      top: 200px;
      bottom: 0;
    }
    .placement_quote {
      font-size: 15px;
      top: 500px;
      right: 90px;
    }
    .Quote_home {
      font-size: 30px;
      line-height: 31px;
      margin-bottom: 5px;
    }
    .Quote_home li {
      margin-bottom: 10px;
    }
    .desc_home {
      font-size: 17px;
      line-height: 13px;
    }
    .get_start_home {
      width: 158px;
      height: 38px;
      font-size: 20px;
    }
  }
  @media screen and (max-width: 673px) {
    .main_logo {
      display: none;
    }
    .placement_quote {
      display: none;
    }
    .navbar {
      padding: 10px;
    }
    .home_nav,
    .services_nav,
    .help_nav {
      font-size: 15px;
    }
    .profile_nav {
      margin-right: 10px;
      width: 40px;
      height: 40px;
    }
  }
`;

const Landing = () => {
  return (
    <Container>
      <div className="main_logo">
        <img src={image} alt="" />
      </div>
      <div className="placement_quote">No 1 Placement assist App</div>
      <div className="navbar">
        <div className="logo_nav">OneTouch</div>
        <div className="home_nav">Home</div>
        <div className="services_nav">Services</div>
        <div className="help_nav">Help</div>
        <div className="profile_nav">
          <img src={profile1} alt="" />
        </div>
      </div>
      <div className="home">
        <div className="Quote_home">
          <li style={{ color: "#FF5C00" }}>Make Your</li>
          <li style={{ color: "#000000" }}>Placement easier</li>
          <li style={{ color: "#1400FF" }}>Than before!</li>
        </div>
        <div className="desc_home">We our data hope it will be usefull</div>
        <button className="get_start_home">Get Start</button>
      </div>
    </Container>
  );
};

export default Landing;
