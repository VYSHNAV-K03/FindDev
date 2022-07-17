import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apiUrl } from "../data/api";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 30px;
  .title {
    text-align: center;
  }
  .name_college {
  }
  label {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  button {
    margin-right: 20px;
  }
`;

const DetailsForm = () => {
  const [step, setstep] = useState(0);

  const navigate = useNavigate();

  ///educational details ///

  const [college_name, setcollege_name] = useState();
  const [branch, setbranch] = useState("CSE");
  const [year, setyear] = useState(1);
  const [cgpa, setcgpa] = useState();
  const [sscl_maths, setsscl_maths] = useState();
  const [sscl_phy, setsscl_phy] = useState();
  const [sscl_che, setsscl_che] = useState();
  const [sslc_english, setsscl_english] = useState();
  const [plustwo_maths, setplustwo_maths] = useState();
  const [plustwo_phy, setplustwo_phy] = useState();
  const [plustwo_che, setplustwo_che] = useState();
  const [plustwo_english, setplustwo_english] = useState();
  const [plustwo_cs, setplustwo_cs] = useState();

  ///coding section//////

  const [developer, setdeveloper] = useState(false);
  const [developer_status, setdeveloper_status] = useState();

  const [git, setgit] = useState("");
  const [linkedin, setlinkedin] = useState("");

  const [work, setwork] = useState();

  const [python, setpython] = useState(false);
  const [c, setc] = useState(false);
  const [cplus, setcplus] = useState(false);
  const [js, setjs] = useState(false);
  const [sql, setsql] = useState(false);

  const [python_level, setpython_level] = useState();
  const [c_level, setc_level] = useState();
  const [cplus_level, setcplus_level] = useState();
  const [js_level, setjs_level] = useState();
  const [sql_level, setsql_level] = useState();

  //communication languages section

  const [english, setenglish] = useState(false);
  const [hindi, sethindi] = useState(false);

  const [english_level, setenglish_level] = useState();
  const [hindi_level, sethindi_level] = useState();

  const PostData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        apiUrl + `/student/upload_stud`,
        {
          python,
          python_level,
          c,
          c_level,
          cplus,
          cplus_level,
          js,
          js_level,
          sql,
          sql_level,
          english,
          english_level,
          hindi,
          hindi_level,
          developer,
          developer_status,
          work,
          git,
          linkedin,
          college_name,
          branch,
          year,
          cgpa,
          sscl_maths,
          sscl_phy,
          sscl_che,
          sslc_english,
          plustwo_maths,
          plustwo_phy,
          plustwo_che,
          plustwo_english,
          plustwo_cs,
        },
        {
          withCredentials: true,
        }
      );
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <h1 className="title">Enter The Details</h1>
      <form action="post" onSubmit={PostData}>
        {step === 0 ? (
          <div className="edu_detail">
            <h2>Educational details</h2>

            <label className="name_college">College Name: </label>
            <input
              type="text"
              className=""
              placeholder="Enter the college"
              onChange={(e) => setcollege_name(e.target.value)}
            />
            <br />
            <label htmlFor="branch">Branch</label>
            <select name="branch" onChange={(e) => setbranch(e.target.value)}>
              <option value=""></option>
              <option value="CSE">CSE</option>
              <option value="MECH">MECH</option>
              <option value="IT">IT</option>
              <option value="EC">ECE</option>
              <option value="EEE">EEE</option>
              <option value="CIVIL">CIVIL</option>
            </select>
            <br />
            <label>Year</label>
            <select name="year" onChange={(e) => setyear(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <br />
            <label>Cgpa till Current semester:</label>
            <input
              type="number"
              name="cgpa"
              min="0"
              max="10"
              onChange={(e) => setcgpa(e.target.value)}
            />
            <br />
            <br />
            <h3>SSLC</h3>
            <p>Please enter sslc mark in percentage</p>
            <label>Maths:</label>
            <input
              type="number"
              name="sslc_maths"
              min="0"
              max="100"
              onChange={(e) => setsscl_maths(e.target.value)}
            />
            <br />
            <label>Physics:</label>
            <input
              type="number"
              name="sslc_pyhsics"
              min="0"
              max="100"
              onChange={(e) => setsscl_phy(e.target.value)}
            />
            <br />
            <label>Chemistry:</label>
            <input
              type="number"
              name="sslc_chemistry"
              min="0"
              max="100"
              onChange={(e) => setsscl_che(e.target.value)}
            />
            <br />
            <label>English:</label>
            <input
              type="number"
              name="sslc_english"
              min="0"
              max="100"
              onChange={(e) => setsscl_english(e.target.value)}
            />
            <br />
            <br />
            <h3>12th</h3>
            <p>Please enter 12th mark in percentage</p>
            <label>Maths:</label>
            <input
              type="number"
              name="plustwo_maths"
              min="0"
              max="100"
              onChange={(e) => setplustwo_maths(e.target.value)}
            />
            <br />
            <label>Physics:</label>
            <input
              type="number"
              name="plustwo_pyhsics"
              min="0"
              max="100"
              onChange={(e) => setplustwo_phy(e.target.value)}
            />
            <br />
            <label>Chemistry:</label>
            <input
              type="number"
              name="plustwo_chemistry"
              min="0"
              max="100"
              onChange={(e) => setplustwo_che(e.target.value)}
            />
            <br />
            <label>English:</label>
            <input
              type="number"
              name="plustwo_english"
              min="0"
              max="100"
              onChange={(e) => setplustwo_english(e.target.value)}
            />
            <br />
            <label>Computer science:</label>
            <input
              type="number"
              name="plustwo_computer"
              placeholder="set 0 if not opted CS"
              min="0"
              max="100"
              onChange={(e) => setplustwo_cs(e.target.value)}
            />
            <br />
            <br />

            <button
              className="btn btn-outline-primary"
              onClick={() => setstep(1)}
            >
              NEXT
            </button>
          </div>
        ) : (
          <div className="skill">
            <h3>Skill Details</h3>
            <label htmlFor="developer">Are you a developer:</label>

            <select
              name="developer"
              onChange={(e) => setdeveloper(e.target.value)}
            >
              <option value="false">no</option>
              <option value="true">yes</option>
            </select>
            {developer && (
              <div className="developer_status">
                <label htmlFor="developer">What developer are you:</label>

                <select
                  name="developer"
                  onChange={(e) => setdeveloper_status(e.target.value)}
                >
                  <option value="Not A Developer Now"></option>
                  <option value="App Developer">App Developer</option>
                  <option value="Web Developer">Web Developer</option>
                  <option value="AI Developer">AI Developer</option>
                  <option value="Game Developer">Game Developer</option>
                  <option value="Developer">Other Developer</option>
                </select>
              </div>
            )}
            <br />
            <label htmlFor="working">working status:</label>

            <select
              name="working_status"
              onChange={(e) => setwork(e.target.value)}
            >
              <option value="Not working"></option>
              <option value="student">Student</option>
              <option value="freelancer">Freelancer</option>
              <option value="startup">Startup</option>
              <option value="company">Working in a company</option>
            </select>
            <br />
            <br />

            <div className="coding_language_div">
              <label>coding languages:</label>
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
            <br />
            {/* communication section */}
            <div className="communication_language_div">
              <label>communication languages:</label>
              <br />

              <input
                type="checkbox"
                id="english"
                name="communication_language_name"
                value="english"
                onClick={() => setenglish(!english)}
              />
              <label htmlFor="english">english</label>
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
                value="hindi"
                onClick={() => sethindi(!hindi)}
              />
              <label htmlFor="hindi">hindi</label>
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
            <br />
            <label htmlFor="git">Github Link:</label>
            <input
              type="text"
              name="git"
              id="git"
              placeholder="paste your github profile link"
              onChange={(e) => setgit(e.target.value)}
            />
            <br />
            <label htmlFor="linkedin">Linkedin:</label>
            <input
              type="text"
              name="linkedin"
              id="linkedin"
              placeholder="paste your linkedin profile link"
              onChange={(e) => setlinkedin(e.target.value)}
            />
            <br />
            <br />
            <button
              className="btn btn-outline-primary"
              onClick={() => setstep(0)}
            >
              Back
            </button>

            <input className="btn btn-outline-success" type="submit" />
          </div>
        )}
      </form>
    </Container>
  );
};

export default DetailsForm;
