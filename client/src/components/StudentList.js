import React, { useEffect, useState } from "react";
import styled from "styled-components";
import image1 from "../assets/studentprofileimages/chikkubhai.png";
import DoneIcon from "@mui/icons-material/Done";
import LoopIcon from "@mui/icons-material/Loop";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { apiUrl } from "../data/api";
import profile1 from "../assets/profile_dummy/profile1.png";
import axios from "axios";
import { Buffer } from "buffer";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
  .loader {
    position: absolute;
    background: white;
    top: 0;
    left: 0;
    width: 100vw;
    height: 70vh;
    z-index: 10;
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
  .studenteach {
    padding: 20px 50px;
    border: 1px solid blue;
    display: flex;
    align-items: center;
  }

  .image {
    width: 50px;
    height: 50px;
    margin-right: 20px;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .name {
    font-size: 1.2rem;
    font-weight: 500;
    text-transform: uppercase;
    color: blue;
  }
  @media screen and (max-width: 450px) {
    .studenteach {
      padding: 20px 10px;
    }
    .image {
      margin-right: 5px;
    }
    .name {
      font-size: 1rem;
    }
  }
  .verified {
    margin-left: auto;
  }
  .verify {
    border: 2px solid green;
    color: green;
    border-radius: 20px;
    padding: 2px 5px;
  }
  .parverify {
    border: 2px solid orange;
    color: orange;
    border-radius: 20px;
    padding: 2px 5px;
  }
  .notverify {
    border: 2px solid red;
    color: red;
    border-radius: 20px;
    padding: 2px 5px;
  }
`;

const StudentList = (props) => {
  const [data, setdata] = useState();

  const [nu_un, setnu_un] = useState(false);

  const [loader, setloader] = useState(true);

  const navigate = useNavigate();

  console.log(props.id);
  // props.id ? setnu_un(true) : setnu_un(false);

  const getStudentList = async () => {
    try {
      setloader(true);

      const res = await axios.post(apiUrl + `/student/get_stud`, {
        id: props.id,
        nu: nu_un,
      });
      setdata(res.data);
      setloader(false);
    } catch (error) {
      console.log(error);
      setloader(false);
    }
  };

  // console.log(data);
  // console.log(nu_un);

  useEffect(() => {
    getStudentList();
    if (props.id) {
      setnu_un(true);
    } else {
      setnu_un(false);
    }
  }, [props.id]);

  return (
    <Container>
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
      {data &&
        data.map(
          (element, index) =>
            element.ver !== 1 &&
            element.ver !== 0 && (
              <div
                className="studenteach"
                key={index}
                onClick={() =>
                  navigate("/profile_admin_want", {
                    state: { id: element._id },
                  })
                }
              >
                <div className="image">
                  <img
                    src={
                      element.profile
                        ? `data:${
                            element.profile.contentType
                          };base64, ${Buffer.from(
                            element.profile.data.data
                          ).toString("base64")}`
                        : profile1
                    }
                    alt="profile"
                  />
                </div>
                <div className="name">{element.name}</div>
                <div className="verified">
                  {element?.ver === 0 ? (
                    <div className="notverify">
                      <ReportProblemIcon /> Not verified
                    </div>
                  ) : element?.ver === 1 ? (
                    <div className="parverify">
                      <LoopIcon /> Partially verified
                    </div>
                  ) : (
                    <div className="verify">
                      <DoneIcon /> Verified
                    </div>
                  )}
                </div>
              </div>
            )
        )}
      {data &&
        data.map(
          (element, index) =>
            element.ver === 1 && (
              <div
                className="studenteach"
                key={index}
                onClick={() =>
                  navigate("/profile_admin_want", {
                    state: { id: element._id },
                  })
                }
              >
                <div className="image">
                  <img
                    src={
                      element.profile
                        ? `data:${
                            element.profile.contentType
                          };base64, ${Buffer.from(
                            element.profile.data.data
                          ).toString("base64")}`
                        : profile1
                    }
                    alt="profile"
                  />
                </div>
                <div className="name">{element.name}</div>
                <div className="verified">
                  {element?.ver === 0 ? (
                    <div className="notverify">
                      <ReportProblemIcon /> Not verified
                    </div>
                  ) : element?.ver === 1 ? (
                    <div className="parverify">
                      <LoopIcon /> Partially verified
                    </div>
                  ) : (
                    <div className="verify">
                      <DoneIcon /> Verified
                    </div>
                  )}
                </div>
              </div>
            )
        )}
      {data &&
        data.map(
          (element, index) =>
            element.ver === 0 && (
              <div
                className="studenteach"
                key={index}
                onClick={() =>
                  navigate("/profile_admin_want", {
                    state: { id: element._id },
                  })
                }
              >
                <div className="image">
                  <img
                    src={
                      element.profile
                        ? `data:${
                            element.profile.contentType
                          };base64, ${Buffer.from(
                            element.profile.data.data
                          ).toString("base64")}`
                        : profile1
                    }
                    alt="profile"
                  />
                </div>
                <div className="name">{element.name}</div>
                <div className="verified">
                  {element?.ver === 0 ? (
                    <div className="notverify">
                      <ReportProblemIcon /> Not verified
                    </div>
                  ) : element?.ver === 1 ? (
                    <div className="parverify">
                      <LoopIcon /> Partially verified
                    </div>
                  ) : (
                    <div className="verify">
                      <DoneIcon /> Verified
                    </div>
                  )}
                </div>
              </div>
            )
        )}
    </Container>
  );
};

export default StudentList;
