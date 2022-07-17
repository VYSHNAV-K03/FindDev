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
    width: 80vw;
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
  }
  .close {
    position: absolute;
    right: 40px;
    top: 30px;
    background: black;
    padding: 5px;
    color: white;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s;
    :hover {
      transform: scale(1.1);
    }
  }
  .coding_title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-left: 10px;
    margin-bottom: 20px;
  }
`;

const SearchArea = () => {
  const [popup, setpopup] = useState(false);

  const navigate = useNavigate();

  const [data, setdata] = useState();

  //title area
  const [coding, setcoding] = useState(false);

  //

  const [python, setpython] = useState(false);
  const [c, setc] = useState(false);
  const [cplus, setcplus] = useState(false);
  const [js, setjs] = useState(false);
  const [sql, setsql] = useState(false);

  const PostData = async () => {
    try {
      const res = await axios.post(
        apiUrl + `/student/get_filter_stud`,
        {
          python,
          c,
          cplus,
          js,
          sql,
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
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);

  useEffect(() => {
    console.log({
      python,
      c,
      cplus,
      js,
      sql,
    });
  }, [python, c, cplus, js, sql]);

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
        <div className="popup">
          <div className="close" onClick={() => setpopup(false)}>
            <CloseIcon />
          </div>
          <input
            type="checkbox"
            id="coding"
            name="coding"
            onClick={() => setcoding(!coding)}
          />
          <label className="coding_title" htmlFor="coding">
            Coding
          </label>
          {coding && (
            <div className="coding_language_level_filter">
              {/* python */}
              <input
                type="checkbox"
                id="python"
                name="coding_language_name"
                onClick={() => setpython(!python)}
              />
              <label htmlFor="python">Python</label>
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

              <br />
              <br />
              <button type="submit" onClick={PostData}>
                Submit
              </button>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default SearchArea;
