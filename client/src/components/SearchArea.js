import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { apiUrl } from "../data/api";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  min-height: 120px;
  background: #fff;
  display: flex;
  align-items: center;
  position: relative;
  .searchbyfilter {
    margin: 0 auto;
  }
  .popup {
    position: absolute;
    width: min(400px, 90vw);
    min-height: 500px;
    background: #ffffff;
    box-shadow: 0px 0px 14px 1px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 0px 0px 14px 1px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 14px 1px rgba(0, 0, 0, 0.75);
    top: -10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 20px;
    z-index: 20;
  }
  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    background: blue;
    padding: 2px;
    color: white;
    border-radius: 50%;
    cursor: pointer;
    transform: scale(0.8);
    transition: 0.3s;
    :hover {
      transform: scale(1);
    }
  }
  .filter_contents {
    margin: 20px 0;
    cursor: pointer;
  }
  .radio_input {
    cursor: pointer;
  }
  .language_container {
    margin: 20px 0;
    padding: 10px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .inputs_languages {
    display: flex;
    margin-right: 15px;
  }
  .lang_inp {
    margin-right: 5px;
  }
  .coding_title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-left: 10px;
    margin-bottom: 20px;
  }
  .button_and_loader {
    position: relative;
  }
  .btn_loader {
    position: absolute;
    top: -5px;
    left: -5px;
    bottom: -5px;
    right: -5px;
    background: white;
    padding: 15px 20px;
  }
  .load {
  }
  .sslc_content input {
    margin-bottom: 10px;
  }
  .submit_btn {
    margin-top: 20px;
  }
`;

const SearchArea = () => {
  const [filter_content, setfilter_content] = useState();

  const [filter_skill, setfilter_skill] = useState();

  const [filter_education, setfilter_education] = useState();

  const [filter_communication, setfilter_communication] = useState();

  const [popup, setpopup] = useState(false);

  const navigate = useNavigate();

  const [data, setdata] = useState();

  const [btnloader, setbtnloader] = useState(false);

  const [python, setpython] = useState(false);
  const [c, setc] = useState(false);
  const [cplus, setcplus] = useState(false);
  const [js, setjs] = useState(false);
  const [sql, setsql] = useState(false);

  const [python_level, setpython_level] = useState("beginner");
  const [c_level, setc_level] = useState("beginner");
  const [cplus_level, setcplus_level] = useState("beginner");
  const [js_level, setjs_level] = useState("beginner");
  const [sql_level, setsql_level] = useState("beginner");

  const [web_dev, setweb_dev] = useState(false);
  const [app_dev, setapp_dev] = useState(false);
  const [game_dev, setgame_dev] = useState(false);
  const [ai_dev, setai_dev] = useState(false);

  const [iot, setiot] = useState(false);
  const [cad, setcad] = useState(false);
  const [robotics, setrobotics] = useState(false);

  const [sslc_maths, setsslc_maths] = useState();
  const [sslc_phy, setsslc_phy] = useState();
  const [sslc_che, setsslc_che] = useState();

  const [plustwo_phy, setplustwo_phy] = useState();
  const [plustwo_che, setplustwo_che] = useState();
  const [plustwo_maths, setplustwo_maths] = useState();

  const [year, setyear] = useState();
  const [cgpa, setcgpa] = useState();
  const [suppli, setsuppli] = useState();
  const [branch, setbranch] = useState();

  const [english, setenglish] = useState(false);
  const [hindi, sethindi] = useState(false);

  const [english_level, setenglish_level] = useState("beginner");
  const [hindi_level, sethindi_level] = useState("beginner");

  const PostData = async () => {
    try {
      setbtnloader(true);
      const res = await axios.post(
        apiUrl + `/student/get_filter_stud`,
        {
          python,
          c,
          cplus,
          js,
          sql,
          python_level,
          c_level,
          cplus_level,
          js_level,
          sql_level,
          english,
          english_level,
          hindi,
          hindi_level,
          web_dev,
          app_dev,
          game_dev,
          ai_dev,
          iot,
          cad,
          robotics,
          sslc_maths,
          sslc_phy,
          sslc_che,
          plustwo_phy,
          plustwo_che,
          plustwo_maths,
          year,
          cgpa,
          suppli,
          branch,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      setdata(
        res.data &&
          res.data.map((element, index) => {
            return element._id;
          })
      );

      navigate("/", {
        state: {
          id:
            res.data &&
            res.data.map((element, index) => {
              return element._id;
            }),
        },
      });
      setpopup(false);
      setpython(false);
      setc(false);
      setcplus(false);
      setjs(false);
      setsql(false);
      setbtnloader(false);
      setfilter_content(false);
      setfilter_communication(false);
      setfilter_education(false);
      setfilter_skill(false);
      setweb_dev(false);
      setapp_dev(false);
      setgame_dev(false);
      setai_dev(false);
      setiot(false);
      setcad(false);
      setrobotics(false);
      setsslc_maths();
      setsslc_phy();
      setsslc_che();
      setplustwo_phy();
      setplustwo_che();
      setplustwo_maths();
      setyear();
      setcgpa();
      setsuppli();
      setbranch();
      setenglish(false);
      sethindi(false);
    } catch (error) {
      console.log(error);
      setbtnloader(false);
    }
  };

  useEffect(() => {
    console.log({
      python,
      c,
      cplus,
      js,
      sql,
      python_level,
      c_level,
      cplus_level,
      js_level,
      sql_level,
      web_dev,
      app_dev,
      game_dev,
      ai_dev,
      iot,
      cad,
      robotics,
      sslc_maths,
      sslc_phy,
      sslc_che,
      plustwo_phy,
      plustwo_che,
      plustwo_maths,
      year,
      cgpa,
      suppli,
      branch,
      filter_content,
      filter_communication,
      english,
      english_level,
      hindi,
      hindi_level,
    });
  }, [
    python,
    c,
    cplus,
    js,
    sql,
    python_level,
    c_level,
    cplus_level,
    js_level,
    sql_level,
    web_dev,
    app_dev,
    game_dev,
    ai_dev,
    iot,
    cad,
    robotics,
    sslc_maths,
    sslc_phy,
    sslc_che,
    plustwo_phy,
    plustwo_che,
    plustwo_maths,
    year,
    cgpa,
    suppli,
    branch,
    filter_content,
    filter_communication,
    english,
    english_level,
    hindi,
    hindi_level,
  ]);

  return (
    <Container>
      <Button
        variant="outlined"
        className="searchbyfilter"
        startIcon={<FilterAltIcon />}
        onClick={() => setpopup(true)}
      >
        Search By Filter
      </Button>
      {popup && (
        <div className="popup" onSubmit={PostData}>
          <div className="close" onClick={() => setpopup(false)}>
            <CloseIcon />
          </div>

          <select
            className="form-select filter_contents"
            aria-label="sumesh"
            onChange={(e) => setfilter_content(e.target.value)}
          >
            <option defaultValue>Filter</option>
            <option value="skill">Skill based</option>
            <option value="education">Education</option>
            <option value="communication">communication </option>
          </select>
          {filter_content === "skill" ? (
            <select
              className="form-select filter_contents"
              aria-label="ramesh"
              onChange={(e) => setfilter_skill(e.target.value)}
            >
              <option defaultValue>Filter</option>
              <option value="coding">coding languages</option>
              <option value="dev">development</option>
              <option value="hardware">Hardware</option>
            </select>
          ) : filter_content === "education" ? (
            <select
              className="form-select filter_contents"
              aria-label="satheesh"
              onChange={(e) => setfilter_education(e.target.value)}
            >
              <option defaultValue>Filter</option>
              <option value="sslc">sslc</option>
              <option value="plustwo">plustwo</option>
              <option value="btech">btech</option>
            </select>
          ) : filter_content === "communication" ? (
            <div className="communication_language_div">
              <br />
              <input
                type="checkbox"
                id="english"
                name="communication_language_name"
                onClick={() => setenglish(!english)}
              />
              <label htmlFor="english">English</label>
              {english && (
                <div className="level">
                  <input
                    type="radio"
                    id="english_beginner"
                    value="beginner"
                    name="english_language_level"
                    onChange={(e) => setenglish_level(e.target.value)}
                  />
                  <label htmlFor="english_beginner">beginner</label>
                  <input
                    type="radio"
                    id="english_intermediate"
                    value="intermediate"
                    name="english_language_level"
                    onChange={(e) => setenglish_level(e.target.value)}
                  />
                  <label htmlFor="english_intermediate">intermediate</label>
                  <input
                    type="radio"
                    id="english_advanced"
                    value="advanced"
                    name="english_language_level"
                    onChange={(e) => setenglish_level(e.target.value)}
                  />
                  <label htmlFor="english_advanced">advanced</label>
                </div>
              )}
              <br />
              <input
                type="checkbox"
                id="hindi"
                name="communication_language_name"
                onClick={() => sethindi(!hindi)}
              />
              <label htmlFor="hindi">Hindi</label>
              {hindi && (
                <div className="level">
                  <input
                    type="radio"
                    id="hindi_beginner"
                    value="beginner"
                    name="hindi_language_level"
                    onChange={(e) => sethindi_level(e.target.value)}
                  />
                  <label htmlFor="hindi_beginner">beginner</label>
                  <input
                    type="radio"
                    id="hindi_intermediate"
                    value="intermediate"
                    name="hindi_language_level"
                    onChange={(e) => sethindi_level(e.target.value)}
                  />
                  <label htmlFor="hindi_intermediate">intermediate</label>
                  <input
                    type="radio"
                    id="hindi_advanced"
                    value="advanced"
                    name="hindi_language_level"
                    onChange={(e) => sethindi_level(e.target.value)}
                  />
                  <label htmlFor="hindi_advanced">advanced</label>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}

          {filter_content === "skill" && filter_skill === "coding" && (
            <div className="coding_language_div">
              <br />
              {/* python */}
              <input
                type="checkbox"
                id="python"
                name="coding_language_name"
                onClick={() => setpython(!python)}
              />
              <label htmlFor="python">Python</label>
              {python && (
                <div className="level">
                  <input
                    type="radio"
                    id="python_beginner"
                    value="beginner"
                    name="python_language_level"
                    onChange={(e) => setpython_level(e.target.value)}
                  />
                  <label htmlFor="python_beginner">beginner</label>
                  <input
                    type="radio"
                    id="python_intermediate"
                    value="intermediate"
                    name="python_language_level"
                    onChange={(e) => setpython_level(e.target.value)}
                  />
                  <label htmlFor="python_intermediate">intermediate</label>
                  <input
                    type="radio"
                    id="python_advanced"
                    value="advanced"
                    name="python_language_level"
                    onChange={(e) => setpython_level(e.target.value)}
                  />
                  <label htmlFor="python_advanced">advanced</label>
                </div>
              )}
              <br />
              {/* c */}
              <input
                type="checkbox"
                id="c"
                name="coding_language_name"
                value="c"
                onClick={() => setc(!c)}
              />
              <label htmlFor="c">C</label>
              {c && (
                <div className="level">
                  <input
                    type="radio"
                    id="c_beginner"
                    value="beginner"
                    name="c_language_level"
                    onChange={(e) => setc_level(e.target.value)}
                  />
                  <label htmlFor="c_beginner">beginner</label>
                  <input
                    type="radio"
                    id="c_intermediate"
                    value="intermediate"
                    name="c_language_level"
                    onChange={(e) => setc_level(e.target.value)}
                  />
                  <label htmlFor="c_intermediate">intermediate</label>
                  <input
                    type="radio"
                    id="c_advanced"
                    value="advanced"
                    name="c_language_level"
                    onChange={(e) => setc_level(e.target.value)}
                  />
                  <label htmlFor="c_advanced">advanced</label>
                </div>
              )}
              <br />
              {/* c++ */}
              <input
                type="checkbox"
                id="c++"
                name="coding_language_name"
                value="c++"
                onClick={() => setcplus(!cplus)}
              />
              <label htmlFor="c++">C++</label>
              {cplus && (
                <div className="level">
                  <input
                    type="radio"
                    id="cplus_beginner"
                    value="beginner"
                    name="cplus_language_level"
                    onChange={(e) => setcplus_level(e.target.value)}
                  />
                  <label htmlFor="cplus_beginner">beginner</label>
                  <input
                    type="radio"
                    id="cplus_intermediate"
                    value="intermediate"
                    name="cplus_language_level"
                    onChange={(e) => setcplus_level(e.target.value)}
                  />
                  <label htmlFor="cplus_intermediate">intermediate</label>
                  <input
                    type="radio"
                    id="cplus_advanced"
                    value="advanced"
                    name="cplus_language_level"
                    onChange={(e) => setcplus_level(e.target.value)}
                  />
                  <label htmlFor="cplus_advanced">advanced</label>
                </div>
              )}{" "}
              <br />
              {/* js */}
              <input
                type="checkbox"
                id="js"
                name="coding_language_name"
                value="js"
                onClick={() => setjs(!js)}
              />
              <label htmlFor="js">Javascript</label>
              {js && (
                <div className="level">
                  <input
                    type="radio"
                    id="js_beginner"
                    value="beginner"
                    name="js_language_level"
                    onChange={(e) => setjs_level(e.target.value)}
                  />
                  <label htmlFor="js_beginner">beginner</label>
                  <input
                    type="radio"
                    id="js_intermediate"
                    value="intermediate"
                    name="js_language_level"
                    onChange={(e) => setjs_level(e.target.value)}
                  />
                  <label htmlFor="js_intermediate">intermediate</label>
                  <input
                    type="radio"
                    id="js_advanced"
                    value="advanced"
                    name="js_language_level"
                    onChange={(e) => setjs_level(e.target.value)}
                  />
                  <label htmlFor="js_advanced">advanced</label>
                </div>
              )}{" "}
              <br />
              {/* sql */}
              <input
                type="checkbox"
                id="sql"
                name="coding_language_name"
                value="sql"
                onClick={() => setsql(!sql)}
              />
              <label htmlFor="sql">SQL</label>
              {sql && (
                <div className="level">
                  <input
                    type="radio"
                    id="sql_beginner"
                    value="beginner"
                    name="sql_language_level"
                    onChange={(e) => setsql_level(e.target.value)}
                  />
                  <label htmlFor="sql_beginner">beginner</label>
                  <input
                    type="radio"
                    id="sql_intermediate"
                    value="intermediate"
                    name="sql_language_level"
                    onChange={(e) => setsql_level(e.target.value)}
                  />
                  <label htmlFor="sql_intermediate">intermediate</label>
                  <input
                    type="radio"
                    id="sql_advanced"
                    value="advanced"
                    name="sql_language_level"
                    onChange={(e) => setsql_level(e.target.value)}
                  />
                  <label htmlFor="sql_advanced">advanced</label>
                </div>
              )}
            </div>
          )}

          {filter_content === "skill" && filter_skill === "dev" && (
            <div className="development_div">
              <input
                type="checkbox"
                id="web developer"
                name="development_name"
                style={{ marginRight: "5px" }}
                onClick={() => setweb_dev(!web_dev)}
              />
              <label htmlFor="web developer">Web Developer</label>
              <br />
              <input
                type="checkbox"
                id="app developer"
                name="development_name"
                style={{ marginRight: "5px" }}
                onClick={() => setapp_dev(!app_dev)}
              />
              <label htmlFor="app developer">App Developer</label> <br />
              <input
                type="checkbox"
                id="game developer"
                name="development_name"
                style={{ marginRight: "5px" }}
                onClick={() => setgame_dev(!game_dev)}
              />
              <label htmlFor="game developer">Game Developer</label>
              <br />
              <input
                type="checkbox"
                id="ai developer"
                name="development_name"
                style={{ marginRight: "5px" }}
                onClick={() => setai_dev(!ai_dev)}
              />
              <label htmlFor="ai developer">AI Developer</label>
            </div>
          )}
          {filter_content === "skill" && filter_skill === "hardware" && (
            <div className="hardware_div">
              <input
                type="checkbox"
                id="iot"
                name="hardware_name"
                style={{ marginRight: "5px" }}
                onClick={() => setiot(!iot)}
              />
              <label htmlFor="iot">IOT</label>
              <br />
              <input
                type="checkbox"
                id="cad"
                name="hardware_name"
                style={{ marginRight: "5px" }}
                onClick={() => setcad(!cad)}
              />
              <label htmlFor="cad">Cad</label> <br />
              <input
                type="checkbox"
                id="robotics"
                name="hardware_name"
                style={{ marginRight: "5px" }}
                onClick={() => setrobotics(!robotics)}
              />
              <label htmlFor="robotics">Robotics</label>
            </div>
          )}

          {filter_content === "education" && filter_education === "sslc" && (
            <div className="sslc_content">
              Physics :{" "}
              <input
                type="number"
                name="physics"
                id="physics"
                placeholder="percentage"
                onChange={(e) => setsslc_phy(e.target.value)}
              />{" "}
              <br />
              Maths :{" "}
              <input
                type="number"
                name="maths"
                id="maths"
                placeholder="percentage"
                onChange={(e) => setsslc_maths(e.target.value)}
              />{" "}
              <br />
              Chemistry :{" "}
              <input
                type="number"
                name="chemistry"
                id="chemistry"
                placeholder="percentage"
                onChange={(e) => setsslc_che(e.target.value)}
              />
            </div>
          )}

          {filter_content === "education" && filter_education === "plustwo" && (
            <div className="sslc_content">
              Physics :{" "}
              <input
                type="number"
                name="physics"
                id="physics"
                placeholder="percentage"
                onChange={(e) => setplustwo_phy(e.target.value)}
              />{" "}
              <br />
              Maths :{" "}
              <input
                type="number"
                name="maths"
                id="maths"
                placeholder="percentage"
                onChange={(e) => setplustwo_maths(e.target.value)}
              />{" "}
              <br />
              Chemistry :{" "}
              <input
                type="number"
                name="chemistry"
                id="chemistry"
                placeholder="percentage"
                onChange={(e) => setplustwo_che(e.target.value)}
              />
            </div>
          )}

          {filter_content === "education" && filter_education === "btech" && (
            <div className="sslc_content">
              <br />
              <label>Year : </label>
              <select
                name="year"
                style={{ marginLeft: "10px", marginBottom: "10px" }}
                onChange={(e) => setyear(e.target.value)}
              >
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <br />
              <label htmlFor="branch">Branch : </label>
              <select
                name="branch"
                style={{ marginLeft: "10px", marginBottom: "10px" }}
                onChange={(e) => setbranch(e.target.value)}
              >
                <option value=""></option>
                <option value="CSE">CSE</option>
                <option value="MECH">MECH</option>
                <option value="IT">IT</option>
                <option value="EC">ECE</option>
                <option value="EEE">EEE</option>
                <option value="CIVIL">CIVIL</option>
              </select>
              <br />
              CGPA :{" "}
              <input
                type="number"
                name="cgpa"
                id="cgpa"
                placeholder="till current semester"
                onChange={(e) => setcgpa(e.target.value)}
              />{" "}
              <br />
              Back Papers :{" "}
              <input
                type="number"
                name="back_paper"
                id="back_paper"
                placeholder="maximum backpapers"
                onChange={(e) => setsuppli(e.target.value)}
              />
            </div>
          )}

          {filter_content && filter_content !== "Filter" && (
            <button
              className="btn btn-outline-success submit_btn"
              type="submit"
              onClick={PostData}
            >
              Submit
            </button>
          )}
        </div>
      )}
    </Container>
  );
};

export default SearchArea;
