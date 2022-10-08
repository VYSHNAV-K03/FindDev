import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { apiUrl } from "../data/api";

const Container = styled.div``;

const ItemEach = styled.div`
  padding: 20px 50px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;

  background: ${(props) =>
    props.back ? "rgba(217, 217, 217, 0.3)" : " rgba(217, 217, 217, 0.15);"};

  color: #000000;
  cursor: pointer;
  :hover {
    color: blue;
  }
  span {
    font-weight: 600;
  }
`;

const Notification = () => {
  const [bg, setbg] = useState(true);

  const [notifications, setnotifications] = useState();

  const navigate = useNavigate();

  const callNavbar = async () => {
    try {
      const res = await axios.get(apiUrl + `/getData`, {
        withCredentials: true,
      });

      const data = res.data;

      setnotifications(data.notifications && data.notifications);

      if (res.status !== 200) {
        throw new Error(res.error);
      }
    } catch (e) {
      console.log("error", e);
      // navigate("/login");
    }
  };
  console.log(notifications);

  useEffect(() => {
    callNavbar();
  }, []);

  return (
    <>
      <Navbar role={false} />
      <Container>
        {notifications &&
          notifications.reverse().map((notification, index) => (
            <ItemEach
              back={index % 2 === 0 ? false : true}
              className="item_each"
              key={notification._id}
              onClick={() =>
                navigate("/notification_each", {
                  state: { id: notification._id },
                })
              }
            >
              You have an update from <span>{notification.company_name}</span>
            </ItemEach>
          ))}
      </Container>
    </>
  );
};

export default Notification;
