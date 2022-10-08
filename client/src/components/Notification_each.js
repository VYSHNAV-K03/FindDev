import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../data/api";

const Container = styled.div`
  padding: 50px;
  .title {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 49px;
    /* identical to box height */

    color: #4a5a96;
  }
  .details {
    padding: 40px 100px;
  }
  .date {
    display: flex;
    margin-bottom: 30px;
  }
  .date_title {
    width: 333px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 25px;
    line-height: 39px;
    /* identical to box height */

    color: #000000;
  }
  .date_content {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 39px;
    /* identical to box height */

    color: #000000;
  }
  .question {
    display: flex;
    position: relative;
    max-width: 600px;
    padding: 50px 0;
  }
  .confirm {
    position: absolute;
    bottom: 0;
    right: 0;
    border: none;
    outline: none;

    background: #4a5a96;
    border-radius: 10px;

    width: 141px;
    height: 39px;

    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 29px;

    color: #ffffff;
  }
  .question_title {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 25px;
    line-height: 39px;
    /* identical to box height */

    color: #000000;

    margin-right: 50px;
  }
  .input_accept_reject input {
    width: 13px;
    height: 13px;
    cursor: pointer;
  }
  .input_accept_reject label {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 39px;
    margin-right: 10px;
    /* identical to box height */

    color: #000000;
    cursor: pointer;
  }
`;

const Notification_each = () => {
  const location = useLocation();

  const [notification, setnotification] = useState([]);

  const [name, setname] = useState();
  const [response, setresponse] = useState(false);

  const getStudent = async () => {
    try {
      const res = await axios.get(apiUrl + `/getData`, {
        withCredentials: true,
      });
      console.log(res.data.notifications);
      setnotification(
        res.data.notifications.filter(
          (element) => element._id === location.state.id
        )
      );
      res.data.notifications
        .filter((element) => element._id === location.state.id)
        .map((item) => setname(item.company_name));
    } catch (error) {
      console.log("error_notification", error);
    }
  };

  console.log(notification);
  console.log(name);
  console.log(response);

  const sendResponse = async () => {
    try {
      const res = await axios.post(
        apiUrl + `/mailsend/send_student_response`,
        {
          name,
          response,
        },
        { withCredentials: true }
      );
      window.alert("send response successfully");
    } catch (error) {
      console.log("send response frontend", error);
    }
  };

  useEffect(() => {
    getStudent();
    console.log(response);
  }, [response]);

  return (
    <>
      <Navbar role={false} />
      {notification &&
        notification.map((item) => (
          <Container key={item._id}>
            <div className="title">{item.company_name}</div>
            <div className="details">
              {item.date && (
                <div className="date">
                  <div className="date_title">Date</div>
                  <div className="date_content">{item.date}</div>
                </div>
              )}
              {item.level_of_placement ? (
                <div className="date">
                  <div className="date_title">Level</div>
                  <div className="date_content">{item.level_of_placement}</div>
                </div>
              ) : (
                <div className="date_title">You Selected For placement</div>
              )}
              {item.type_exam && (
                <div className="date">
                  <div className="date_title">Exam Type</div>
                  <div className="date_content">{item.type_exam}</div>
                </div>
              )}
              {item.mode && (
                <div className="date">
                  <div className="date_title">Exam Mode</div>
                  <div className="date_content">{item.mode}</div>
                </div>
              )}
              {item.requirements[0] && (
                <div className="date">
                  <div className="date_title">Requirements</div>
                  <div className="date_content">
                    {item.requirements &&
                      item.requirements.map((require) => {
                        return <>{require.laptop && "laptop"}</>;
                      })}
                    {item.requirements &&
                      item.requirements.map((require) => {
                        return <>{require.internet && ","}</>;
                      })}
                    {item.requirements &&
                      item.requirements.map((require) => {
                        return <>{require.internet && "internet"}</>;
                      })}
                  </div>
                </div>
              )}
              {item.requirements[0] && (
                <div className="date">
                  <div className="date_title">More</div>
                  <div className="date_content">
                    {item.requirements &&
                      item.requirements.map((require) => {
                        return <p>{require.more}</p>;
                      })}
                  </div>
                </div>
              )}

              <div className="question">
                <div className="question_title">Do you want to accept?</div>
                <div className="input_accept_reject">
                  <input
                    type="radio"
                    name="response"
                    id="accept"
                    checked={response === true}
                    onChange={() => setresponse(true)}
                  />
                  <label htmlFor="accept">Yes</label>
                  <input
                    type="radio"
                    name="response"
                    id="reject"
                    checked={response === false}
                    onChange={() => setresponse(false)}
                  />
                  <label htmlFor="reject">No</label>
                </div>
                <button className="confirm" onClick={sendResponse}>
                  Confirm
                </button>
              </div>
            </div>
          </Container>
        ))}
    </>
  );
};

export default Notification_each;
