import React, { useState, useEffect } from "react";
import styled from "styled-components";
import profile from "../assets/profile_dummy/profile1.png";
import bg1 from "../assets/profilepage/bg1.svg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LoopIcon from "@mui/icons-material/Loop";
import CancelIcon from "@mui/icons-material/Cancel";
import git from "../assets/profilepage/git.png";
import linkedin from "../assets/profilepage/linkedin.png";
import twitter from "../assets/profilepage/twitter.png";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import { apiUrl } from "../data/api";

const Approve = styled.div`
  background: ${(props) => props.color};
`;

const Container = styled.div`
  padding: 20px 0;
  .update {
    display: flex;
    margin: 20px 30px 10px auto;
  }
  .profile_container {
    width: min(95%, 1300px);
    padding: 20px;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    margin: auto;
    .left {
      width: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .image {
      width: 140px;
      height: 140px;
      margin-bottom: 10px;
    }

    .image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      border: 5px solid black;
    }
    .name {
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 30px;
      line-height: 34px;
      text-align: center;
      color: #000000;
    }
    .detail1 {
      font-family: "Inter";
      font-style: normal;
      line-height: 24px;
      margin-bottom: 10px;
    }

    .approve_container {
      padding: 10px;
      border-radius: 25px;
    }
    .approve {
      color: #fff;
      display: flex;
      border-radius: 25px;
    }

    .tick_icon {
      margin-right: 5px;
    }
    .profile_btn,
    .skills_btn,
    .certificate_btn {
      background: #ff9900;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 15px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 23px;
      text-align: center;
      line-height: 47px;
      color: #ffffff;
      width: 160px;
      height: 50px;
      cursor: pointer;
      transition: all 0.1s ease-in-out;
      :hover {
        transform: scale(1.05);
      }
    }
    .profile_btn {
      margin: 30px 0;
    }
    .skills_btn {
      margin-bottom: 30px;
    }

    .right {
      height: 700px;
      /* background: url(${(props) => props.bg}); */
      background-size: cover;
      box-shadow: 5px 7px 24px 5px rgba(0, 0, 0, 0.11);
      border-radius: 18px;
      width: 80%;
      display: flex;
    }
    .profile_container {
      display: flex;
      margin: auto;
      flex-direction: column;
      font-size: 1.8rem;
      font-family: "Inconsolata";
      background: transparent;
    }
    .name_container {
      display: flex;
      margin-bottom: 10px;
    }
    .profile_name {
      display: flex;
      width: 300px;
      overflow: scroll;
      margin-left: 5px;
    }
    .email_container {
      margin-bottom: 10px;
      display: flex;
    }
    .user_name {
      display: flex;
      width: 300px;
      overflow: scroll;
      margin-left: 5px;
    }
    .current_status {
      margin-bottom: 10px;
      display: flex;
    }
    .id_detail {
      margin-bottom: 10px;
      display: flex;
    }
    .view {
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 38px;
      color: #ffffff;
      margin-left: 10px;
      background: #47d065;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 15px;
      text-align: center;
      width: 100px;
      height: 35px;
    }
    .department_container {
      margin-bottom: 10px;
      display: flex;
    }
    .language_container {
      margin-bottom: 10px;
      display: flex;
    }
    .icon_container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .linkedinimage,
    .gitimage,
    .twitterimage {
      width: 60px;
      height: 60px;
      margin-right: 15px;
    }
    .linkedinimage img,
    .gitimage img,
    .twitterimage img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .profile_name,
    .user_name,
    .status,
    .department,
    .language {
      font-weight: bold;
    }
    @media screen and (max-width: 910px) {
      .image {
        width: 100px;
        height: 100px;
      }
      .name {
        font-size: 25px;
      }
      .approve_container {
        padding: 6px;
      }
      .approve {
      }
      .profile_btn,
      .skills_btn,
      .certificate_btn {
        width: 120px;
        height: 40px;
        font-size: 20px;
        line-height: 37px;
      }
      .right {
        height: 600px;
      }
      .profile_container {
        font-size: 1.5rem;
      }
      .linkedinimage,
      .gitimage,
      .twitterimage {
        width: 50px;
        height: 50px;
      }
    }
  }
  @media screen and (max-width: 694px) {
    .profile_container {
      flex-direction: column;
    }
    .profile_container .left {
      width: 100%;
    }
    .profile_buttons {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    .profile_buttons .profile_btn {
      margin: 20px 10px 20px 0;
    }
    .profile_buttons .skills_btn {
      /* margin-bottom: 0px;
      margin-right: 10px; */
      margin: 20px 10px 20px 0;
    }
    .profile_container .right {
      width: 100%;
    }
  }
  .skills_container {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
  }
  .first_skill,
  .third_skill,
  .known_languages {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 38px;
    line-height: 46px;
    margin-bottom: 10px;

    color: #484848;
  }
  .second_skill {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 38px;
    line-height: 46px;

    color: #000854;
  }
  li {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 46px;
    margin-bottom: 8px;

    color: #484848;
  }
  .current_status_skill {
    margin-top: 30px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 38px;
    line-height: 46px;

    color: #000854;
  }
  @media screen and (max-width: 768px) {
    .first_skill,
    .second_skill,
    .third_skill,
    .known_languages {
      font-size: 28px;
    }
    li {
      font-size: 18px;
    }
    .current_status_skill {
      font-size: 28px;
    }
  }
  .certificates_container {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
  }
  .college_id_certificate,
  .sslc_certificate,
  .plustwo_certificate,
  .udemy_certificate {
    display: flex;
  }
  .name_id,
  .name_sslc,
  .name_plustwo,
  .name_udemy {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 36px;
    display: flex;
    align-items: center;

    color: #545454;
    width: 500px;
    margin-bottom: 40px;
  }
  @media screen and (max-width: 904px) {
    .name_id,
    .name_sslc,
    .name_plustwo,
    .name_udemy {
      font-size: 20px;
      width: 200px;
    }
  }
  @media screen and (max-width: 400px) {
    .name_id,
    .name_sslc,
    .name_plustwo,
    .name_udemy {
      font-size: 20px;
      width: 150px;
    }
  }
`;

const Profilepage_admin_want = () => {
  const [block, setblock] = useState(1);

  const [data, setdata] = useState();

  const location = useLocation();

  console.log(location.state.id);
  const id = location.state.id;
  const getDataProfile = async () => {
    try {
      const res = await axios.post(
        apiUrl + `/student/get_stud_admin_want`,
        { id },
        {
          withcredentials: true,
        }
      );

      setdata(res.data);

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataProfile();
  }, []);

  return (
    <Container bg={bg1}>
      <div className="profile_container">
        <div className="left">
          <div className="image">
            <img
              src={
                data && data.profile
                  ? `data:${data.profile.contentType};base64, ${Buffer.from(
                      data.profile.data.data
                    ).toString("base64")}`
                  : profile
              }
              alt="profile"
            />
          </div>
          <div className="name">{data && data.name}</div>
          <div className="detail1">
            Student of{" "}
            {data && data.education[0] && data.education[0].institution_name}
          </div>
          <Approve
            color={
              data && data?.ver === 0
                ? "red"
                : data?.ver === 1
                ? "orange"
                : "#47d065"
            }
            className="approve_container"
          >
            <div className="approve">
              <div className="tick_icon">
                {data && data?.ver === 0 ? (
                  <CancelIcon />
                ) : data?.ver === 1 ? (
                  <LoopIcon />
                ) : (
                  <CheckCircleIcon />
                )}
              </div>
              {data && data?.ver === 0
                ? "Not verified"
                : data?.ver === 1
                ? "partially verfied"
                : "verified"}
            </div>
          </Approve>
          <div className="profile_buttons">
            <div className="profile_btn" onClick={() => setblock(1)}>
              Profile
            </div>
            <div className="skills_btn" onClick={() => setblock(2)}>
              Skills
            </div>
            <div className="certificate_btn" onClick={() => setblock(3)}>
              Certificates
            </div>
          </div>
        </div>
        <div className="right">
          {block === 1 && (
            <div className="profile_container">
              <div className="name_container">
                Name : <div className="profile_name">{data && data.name}</div>
              </div>
              <div className="email_container">
                Email : <p className="user_name">{data && data.email}</p>
              </div>
              <div className="current_status">
                Current status :{" "}
                <div className="status">
                  Student @{" "}
                  {data &&
                    data.education[0] &&
                    data.education[0].institution_name}
                </div>
              </div>
              <div className="id_detail">
                Id proof <div className="view">View</div>
              </div>
              <div className="department_container">
                Dep :
                <div className="department">
                  {data && data.education[0] && data.education[0].course}
                </div>
              </div>
              <div className="language_container">
                Languages :{" "}
                {data &&
                data.coding[0] &&
                data.coding[0].communication_languages[0] &&
                data.coding[0].communication_languages[0].language_name ? (
                  <div className="language">
                    {data &&
                      data.coding[0] &&
                      data.coding[0].communication_languages[0] &&
                      data.coding[0].communication_languages[0]
                        .language_name}{" "}
                    :{" "}
                    {data &&
                      data.coding[0] &&
                      data.coding[0].communication_languages[0] &&
                      data.coding[0].communication_languages[0].language_level}
                    ,{" "}
                    {data &&
                      data.coding[0] &&
                      data.coding[0].communication_languages[1] &&
                      data.coding[0].communication_languages[1]
                        .language_name}{" "}
                    :{" "}
                    {data &&
                      data.coding[0] &&
                      data.coding[0].communication_languages[1] &&
                      data.coding[0].communication_languages[1].language_level}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="icon_container">
                <a
                  href={
                    data &&
                    data.coding[0] &&
                    data.coding[0].links[0] &&
                    data.coding[0].links[0].linkedin
                  }
                  target="_blank"
                  className="linkedinimage"
                >
                  <img src={linkedin} alt="" />
                </a>
                <div className="gitimage">
                  <a
                    href={
                      data &&
                      data.coding[0] &&
                      data.coding[0].links[0] &&
                      data.coding[0].links[0].github
                    }
                    target="_blank"
                    className="linkedinimage"
                  >
                    <img src={git} alt="" />
                  </a>
                </div>
                <div className="twitterimage">
                  <img src={twitter} alt="" />
                </div>
              </div>
            </div>
          )}
          {block === 2 && (
            <div className="skills_container">
              <div className="known_languages">Languages:</div>
              <ul>
                {data &&
                  data.coding[0] &&
                  data.coding[0].languages &&
                  data.coding[0].languages.map(
                    (item, index) =>
                      item.language_name && (
                        <li key={index}>
                          {item.language_name} : {item.language_level}
                        </li>
                      )
                  )}
              </ul>
              {data &&
              data.coding[0] &&
              data.coding[0].development[0] &&
              data.coding[0].development[0].developer ? (
                <div className="second_skill">
                  He is an{"\t"}
                  {data &&
                    data.coding[0] &&
                    data.coding[0].development[0] &&
                    data.coding[0].development[0].developer}
                </div>
              ) : (
                <div className="second_skill">Not a Developer Now</div>
              )}

              <div className="current_status_skill">
                Current Status : student &{" "}
                {data && data.coding[0] && data.coding[0].working_status}
              </div>
            </div>
          )}
          {block === 3 && (
            <div className="certificates_container">
              <div className="college_id_certificate">
                <div className="name_id">College Id</div>
                <div className="view">View</div>
              </div>
              <div className="sslc_certificate">
                <div className="name_sslc">SSLC Certificate</div>
                <div className="view">View</div>
              </div>
              <div className="plustwo_certificate">
                <div className="name_plustwo">+2 Certificate</div>
                <div className="view">View</div>
              </div>
              <div className="udemy_certificate">
                <div className="name_udemy">Udemy</div>
                <div className="view">View</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Profilepage_admin_want;
