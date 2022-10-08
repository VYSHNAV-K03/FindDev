import React, { useEffect, useState } from "react";
import styled from "styled-components";
import image1 from "../assets/studentprofileimages/chikkubhai.png";
import DoneIcon from "@mui/icons-material/Done";
import LoopIcon from "@mui/icons-material/Loop";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import loader_logo from "../assets/loader/onetouch_logo.png";
import { apiUrl } from "../data/api";
import profile1 from "../assets/profile_dummy/profile1.png";
import axios from "axios";
import { Buffer } from "buffer";
import { Link, useNavigate } from "react-router-dom";
import search_by_name from "../assets/icons/search_filter_name.png";
import icon_right_blue from "../assets/icons/icon_right_blue.png";
import { useDispatch, useSelector } from "react-redux";
import { local_storage_off } from "../actions";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  position: relative;
  width: min(100vw, 1300px);
  margin: auto;
 
  .loader{
    position: absolute;
    width:300px;
    left: 0;
    right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin:0 auto;
  }
  .loader_image{
    width:200px;
    height:200px;

  }
  .loader_image img{
    width:100%;
    height:100%;
    object-fit:cover;
  }
  .loader_line_container{
    width:300px;
    height:10px;

    background: rgba(0, 0, 0, 0.34);
border-radius: 5px;
position: relative;

  }
  .line_loader{
    position: absolute;
    background: #4A5A96;
border-radius: 5px;

top:0;
bottom:0;
left:0;
width:${(props) => (props.loader ? "250px" : "300px")};
animation:loader 5s ease ;
  }

  @keyframes loader{
    from{
      width:0px;
    }
    to{
      width:${(props) => (props.loader ? "250px" : "300px")};
    }
  }
  @media screen and (max-width:700px){
    .loader_image{
    width:130px;
    height:130px;

  }
  .loader_line_container{
    width:150px;
    height:8px;
  }
  .line_loader{
width:${(props) => (props.loader ? "120px" : "150px")};

  }

  @keyframes loader{
    from{
      width:0px;
    }
    to{
      width:${(props) => (props.loader ? "120px" : "150px")};
    }
  }
  }

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
    flex-wrap: wrap;
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
    flex-wrap: wrap;
  }
  .year,
  .branch,
  .cgpa,
  .backpaper,
  .icon_right {
    margin-right: 25px;
    margin-bottom: 10px

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
      min-width: 50px;
      min-height: 50px;
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
      min-width: 95px;
      min-height: 33px;
      font-size: 16px;
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

  const [loader, setloader] = useState(false);

  const [name, setname] = useState("");

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

  const callNavbar = async () => {
    try {
      const res = await axios.get(apiUrl + `/getData`, {
        withCredentials: true,
      });

      const data = res.data;

      setname(data.name);
    } catch (e) {
      console.log("error", e);
      // navigate("/login");
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
    callNavbar();
    console.log(name);
  }, [localstate, localStorage.ids]);

  return (
    <Container loader={loader}>
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
      {loader ? (
        <div className="loader">
          <div className="loader_image">
            <img src={loader_logo} alt="" />
          </div>
          <div className="loader_line_container">
            <div className="line_loader"></div>
          </div>
        </div>
      ) : (
        data &&
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
                      <div className="name">{element.name}</div>
                      <div className="college_name">
                        College of Engineerig, Thalassery
                      </div>
                    </div>
                    {JSON.parse(localStorage.getItem("filter")) === "btech" && (
                      <>
                        {element.education[0] && (
                          <div className="second_row">
                            <div className="year">
                              Year : {element.education[0].year}
                            </div>
                            <div className="branch">
                              Branch : {element.education[0].branch}
                            </div>
                            <div className="cgpa">
                              CGPA : {element.education[0].cgpa}
                            </div>
                            <div className="backpaper">
                              Backpapers : {element.education[0].back_papers}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    {JSON.parse(localStorage.getItem("filter")) ===
                      "placement" &&
                      element.placement &&
                      element.placement
                        .filter((ele) => ele.company_name === name)
                        .map((place) => (
                          <div className="second_row" key={place._id}>
                            <div className="year">
                              Level : {place.level_of_placement}
                            </div>
                            <div className="branch">
                              Response :{" "}
                              {place.response === 1
                                ? "accept"
                                : place.response === 2
                                ? "reject"
                                : "pending"}
                            </div>
                          </div>
                        ))}
                    {JSON.parse(localStorage.getItem("filter")) ===
                      "coding" && (
                      <div className="second_row">
                        {element.coding[0] &&
                          element.coding[0].languages &&
                          element.coding[0].languages
                            .filter((cod) => cod.language_name !== "null")
                            .map((item) => (
                              <div className="year">
                                {item.language_name} :{" "}
                                {item.language_level === "undefined"
                                  ? "beginner"
                                  : item.language_level}
                              </div>
                            ))}

                        {/* <div className="icon_right">
                          <img src={icon_right_blue} alt="" />
                        </div> */}
                      </div>
                    )}
                    {JSON.parse(localStorage.getItem("filter")) === "sslc" &&
                      element.education &&
                      element.education.map((sslc) =>
                        sslc.sslc.map((sslc_each) => (
                          <div className="second_row">
                            <div className="year">Maths :{sslc_each.maths}</div>
                            <div className="branch">
                              Physics :{sslc_each.phy}
                            </div>
                            <div className="branch">
                              Chemistry :{sslc_each.che}
                            </div>
                          </div>
                        ))
                      )}
                    {JSON.parse(localStorage.getItem("filter")) === "plustwo" &&
                      element.education &&
                      element.education.map((sslc) =>
                        sslc.plustwo.map((sslc_each) => (
                          <div className="second_row">
                            <div className="year">Maths :{sslc_each.maths}</div>
                            <div className="branch">
                              Physics :{sslc_each.phy}
                            </div>
                            <div className="branch">
                              Chemistry :{sslc_each.che}
                            </div>
                          </div>
                        ))
                      )}
                    {JSON.parse(localStorage.getItem("filter")) ===
                      "communication" && (
                      <div className="second_row">
                        {element.coding[0] &&
                          element.coding[0].communication_languages &&
                          element.coding[0].communication_languages
                            .filter((lang) => lang.language_name !== "null")
                            .map((item) => (
                              <div className="year">{item.language_name}</div>
                            ))}
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
          )
      )}
    </Container>
  );
};

export default StudentList;
