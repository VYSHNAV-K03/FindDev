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
import search_by_name from "../assets/icons/search_filter_name.png";
import icon_right_blue from "../assets/icons/icon_right_blue.png";
import { useDispatch, useSelector } from "react-redux";
import { local_storage_off } from "../actions";

const Container = styled.div`
  position: relative;
  width: min(100vw, 1300px);
  margin: auto;
  .input_search_name {
    height: 80px;
    padding: 20px;

    background: rgba(61, 86, 178, 0.04);
    border-radius: 10px;

    margin: 0 auto 50px auto;
  }
  .input_search_name_1 {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border-radius: 10px;
    padding: 5px;

    display: flex;
    align-items: center;
  }
  .search_name_icon {
    width: 43px;
    height: 41px;
    margin-right: 5px;
  }
  .search_name_icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .input_search_name_1 input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;

    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;

    color: rgba(61, 86, 178, 0.5);
  }

  .studenteach {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.22);
    padding: 5px;
  }
  .image {
    width: 60px;
    height: 60px;
    margin-right: 10px;
    border-radius: 10px;
  }
  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
  .center_content {
    display: flex;
    flex-direction: column;
    margin-right: auto;
  }
  .first_row {
    display: flex;
    margin-bottom: 10px;
  }
  .name {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 22px;

    margin-right: 10px;
    /* identical to box height */

    color: #000000;
  }
  .college_name {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;

    color: #000000;
  }

  .second_row {
    display: flex;
  }
  .year,
  .branch,
  .cgpa,
  .backpaper,
  .icon_right {
    margin-right: 20px;

    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height */

    color: #4a5a96;
  }
  .last_content {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 137px;
    height: 39px;

    background: #4a5a96;
    border-radius: 10px;

    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;

    color: #ffffff;
    cursor: pointer;
  }
  @media screen and (max-width: 723px) {
    .input_search_name {
      max-width: 584px;
      height: 60px;
      padding: 10px;
      margin: 0 auto 20px auto;
    }
    .search_name_icon {
      width: 33px;
      height: 31px;
    }
    .input_search_name_1 input {
      font-size: 18px;
      line-height: 14px;
    }
    .image {
      width: 40px;
      height: 40px;
    }
    .first_row {
      margin-bottom: 5px;
    }
    .name {
      font-size: 18px;
    }
    .college_name {
      font-size: 15px;
    }
    .year,
    .branch,
    .cgpa,
    .backpaper,
    .icon_right {
      margin-right: 10px;
      font-size: 14px;
    }
    .last_content {
      width: 95px;
      height: 33px;
      font-size: 18px;
    }
    .icon_right {
      width: 20px;
      height: 20px;
    }
    .icon_right img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const StudentList = (props) => {
  const [data, setdata] = useState();

  const [query, setquery] = useState("");

  const [id_storage, setid_storage] = useState([]);

  const [nu_un, setnu_un] = useState(false);

  const [loader, setloader] = useState(true);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const localstate = useSelector((state) => state.changeLocalStorage);

  console.log(props.id);
  // props.id ? setnu_un(true) : setnu_un(false);

  const getStudentList = async () => {
    try {
      setloader(true);

      const res = await axios.post(apiUrl + `/student/get_stud`, {
        // id: props.id,
        id: JSON.parse(localStorage.getItem("ids")),
        nu: nu_un,
      });
      setdata(res.data);
      setloader(false);
      dispatch(local_storage_off());
    } catch (error) {
      console.log(error);
      setloader(false);
    }
  };

  // console.log(data);
  // console.log(nu_un);
  // console.log(JSON.parse(localStorage.getItem("ids")));

  // console.log(localStorage.ids);
  console.log(localstate);

  useEffect(() => {
    getStudentList();

    if (props.id) {
      setnu_un(true);
    } else {
      setnu_un(false);
    }
  }, [localstate, localStorage.ids]);

  return (
    <Container>
      <div className="input_search_name">
        <div className="input_search_name_1">
          <div className="search_name_icon">
            <img src={search_by_name} alt="" />
          </div>
          <input
            type="text"
            onChange={(e) => setquery(e.target.value)}
            placeholder="Search for user"
          />
        </div>
      </div>
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
        data
          .filter((item) => item.name.toLowerCase().includes(query))
          .map(
            (element, index) =>
              element.Role === 0 && (
                <div className="studenteach" key={index}>
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
                  <div className="center_content">
                    <div className="first_row">
                      <div className="name">Emilia</div>
                      <div className="college_name">
                        College of Engineerig, Thalassery
                      </div>
                    </div>
                    {JSON.parse(localStorage.getItem("filter")) === "btech" && (
                      <div className="second_row">
                        <div className="year">Year : 4</div>
                        <div className="branch">Branch : CSE</div>
                        <div className="cgpa">CGPA : 8.2</div>
                        <div className="backpaper">Backpapers : 2</div>
                        <div className="icon_right">
                          <img src={icon_right_blue} alt="" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className="last_content"
                    onClick={() =>
                      navigate("/profile_admin_want", {
                        state: { id: element._id },
                      })
                    }
                  >
                    Profile
                  </div>
                </div>
              )
          )}
    </Container>
  );
};

export default StudentList;
