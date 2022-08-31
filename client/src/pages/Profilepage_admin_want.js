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
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import { apiUrl } from "../data/api";
import Navbar from "../components/Navbar";

const Approve = styled.div`
  background: ${(props) => props.color};
`;

const Container = styled.div`
  position: relative;
  .loader {
    position: absolute;
    background: white;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loader_sub {
    width: 300px;
    height: 100px;
    margin: auto;
    display: flex;
  }
  .button_container {
    display: flex;
  }
  .update {
    display: flex;
    margin: 20px 30px 10px auto;
  }
  .signout {
    display: flex;
    margin: 20px auto 10px 30px;
  }
  .profile_container_main {
    height: calc(100vh - 95px);
    background-color: #fff;
    display: flex;
    margin: auto;
  }
  .left {
    height: 100%;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid rgba(0, 0, 0, 0.22);
  }
  .image {
    width: 159px;
    height: 159px;
    margin: 20px 0 15px 0;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
  .name {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 39px;
    /* identical to box height */

    color: #4a5a96;
    margin-bottom: 5px;
  }
  .detail1 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-align: center;

    color: #000000;

    margin-bottom: 40px;
  }

  .profile_btn,
  .skills_btn,
  .certificate_btn,
  .interview_btn,
  .Select_stud_btn,
  .edu_btn {
    border: 1px solid #4a5a96;
    border-radius: 10px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height */
    display: flex;
    align-items: center;
    justify-content: center;

    color: #4a5a96;

    width: 130px;
    height: 38px;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    :hover {
      transform: scale(1.05);
    }
  }
  .profile_btn {
    margin: 20px 0;
  }
  .skills_btn {
    margin-bottom: 20px;
  }
  .edu_btn {
    margin-bottom: 20px;
  }
  .interview_btn {
    margin-bottom: 20px;
  }
  .certificate_btn {
    margin-bottom: 20px;
  }

  .right {
    display: flex;
    width: 100%;
  }
  .profile_container {
    display: flex;
    min-width: 900px;
    margin: auto;
    flex-direction: column;
    font-size: 1.8rem;
    font-family: "Montserrat";
  }
  .name_container {
    display: flex;
    margin-bottom: 20px;
  }
  .profile_name {
    display: flex;
    width: 300px;
    margin-left: 5px;
  }

  .email_container {
    margin-bottom: 20px;
    display: flex;
  }
  .user_name {
    display: flex;
    width: 300px;
    margin-left: 5px;
  }

  .current_status {
    margin-bottom: 20px;
    display: flex;
  }
  .id_detail {
    margin-bottom: 20px;
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
    background: #4a5a96;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    text-align: center;
    width: 100px;
    height: 35px;
  }
  .department_container {
    margin-bottom: 20px;
    display: flex;
  }
  .language_container {
    margin-bottom: 20px;
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
    .certificate_btn,
    .interview_btn {
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
    .profile_buttons .interview_btn {
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
  .interview_container {
    padding: 50px;
  }
  .companies_select_title {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 38px;
    line-height: 46px;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 883px) {
    .companies_select_title {
      font-size: 28px;
    }
  }
  .placement_select_container {
    padding: 50px;
    background: coral;
  }
`;

const Profilepage_admin_want = () => {
  const [block, setblock] = useState(1);

  const [data, setdata] = useState();

  const [loader, setloader] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  console.log(location.state.id);
  const id = location.state.id;
  const getDataProfile = async () => {
    try {
      // setloader(true);

      const res = await axios.post(
        apiUrl + `/student/get_stud_admin_want`,
        { id },
        {
          withcredentials: true,
        }
      );

      setdata(res.data);

      console.log(res.data);
      // setloader(false);
    } catch (error) {
      console.log(error);
      // setloader(false);
    }
  };

  const SendMail = async () => {
    try {
      const res = await axios.post(
        apiUrl + `/mailsend/sendmail`,
        { id },
        { withCredentials: true }
      );
      console.log(res.data);
      window.alert(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataProfile();
  }, [block]);

  return (
    <div className="main">
      <Navbar />
      <Container bg={bg1}>
        {loader && (
          <div className="loader">
            <div className="loader_sub">
              <div className="d-flex align-items-center">
                <strong>Loading...</strong>
                <div
                  className="spinner-border ms-auto"
                  role="status"
                  aria-hidden="true"
                ></div>
              </div>
            </div>
          </div>
        )}
        {/* <div className="button_container">
        <button
          className="btn btn-outline-primary signout"
          onClick={() => navigate("/")}
        >
          Back To Home
        </button>
        <button
          className="btn btn-outline-primary update"
          onClick={() => navigate("/logout")}
        >
          Sign Out
        </button>
      </div> */}
        <div className="profile_container_main">
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
              {data && data.education[0] && data.education[0].institution_name}
            </div>

            <div className="profile_buttons">
              <div className="profile_btn" onClick={() => setblock(1)}>
                Profile
              </div>
              <div className="skills_btn" onClick={() => setblock(2)}>
                Skills
              </div>
              <div className="edu_btn" onClick={() => setblock(6)}>
                Education
              </div>
              <div className="interview_btn" onClick={() => setblock(4)}>
                Placement
              </div>
              <div className="certificate_btn" onClick={() => setblock(3)}>
                Certificates
              </div>
              <div className="Select_stud_btn" onClick={() => setblock(5)}>
                Select Student
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
                  Id proof :<div className="view">View</div>
                </div>
                <div className="department_container">
                  Dep :
                  <div className="department">
                    {data && data.education[0] && data.education[0].branch}
                  </div>
                </div>
                <div className="language_container">
                  Languages :{" "}
                  {data &&
                    data.coding[0] &&
                    data.coding[0].communication_languages &&
                    data.coding[0].communication_languages.map(
                      (item, index) =>
                        item.language_name &&
                        item.language_name !== "null" && (
                          <li key={index}>{item.language_name}</li>
                        )
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
                        item.language_name &&
                        item.language_name !== "null" && (
                          <li key={index}>
                            {item.language_name} :{" "}
                            {item.language_level === "undefined"
                              ? "beginner"
                              : item.language_level}
                          </li>
                        )
                    )}
                </ul>
                {data &&
                data.coding[0] &&
                data.coding[0].dev_status &&
                data.coding[0].dev_status !== "undefined" ? (
                  <div className="second_skill">
                    He is an {"\t"}
                    {data && data.coding[0] && data.coding[0].dev_status}
                  </div>
                ) : (
                  <div className="second_skill">He is not a developer</div>
                )}

                <div className="current_status_skill">
                  Current Status : student{" "}
                  {data &&
                    data.coding[0] &&
                    data.coding[0].dev_desc !== "undefined" &&
                    "&"}
                  {data &&
                    data.coding[0] &&
                    data.coding[0].dev_desc !== "undefined" &&
                    data.coding[0].dev_desc}
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
            {block === 4 && (
              <div className="interview_container">
                <div className="companies_select_title">
                  Companies Selected For Interview:
                </div>
                <div className="companies_select">
                  <ul>
                    {data &&
                      data.placement[0] &&
                      data.placement
                        .map((item, i) => item.company_name)
                        .filter(
                          (value, index, array_ref) =>
                            array_ref.indexOf(value) === index
                        )
                        .map((x, b) => <li key={b}>{x}</li>)}
                  </ul>
                </div>
              </div>
            )}
            {block === 5 && <div className="placement_select_container"></div>}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profilepage_admin_want;
