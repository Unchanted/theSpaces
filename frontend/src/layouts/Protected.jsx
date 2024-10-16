import { useEffect, useState } from "react";
import { UserDataContext } from "../contexts/userContext";
import EventsDataContext from "../contexts/EventsDataContext";
import { useNavigate, Outlet } from "react-router-dom";

import { axiosCall } from "../utils/api";
import axios from "axios";

export default function Protected() {
  const [events, setEvents] = useState(null);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosCall("POST", "/user/p/me", true);
        if (response.error) {
          throw new Error("error fetching");
        }
        if (response && response.user) {
          setUserData(response.user);
          if (
            response.user.phone_number == null ||
            response.user.roll_number == null
          ) {
            navigate("/getting-started");
          }
          return { status: 200 };
        } else {
          setUserData(null);
          return { status: 400 };
        }
      } catch (err) {
        if (err.status === 401) {
          return { status: 401 };
        }
        console.error(err);
        return { status: 400 };
      }
    };
    const fetchEvents = async () => {
      try {
        const response = await axiosCall("POST", "/event/p/get", true);
        if (response.error) {
          throw new Error("error fetching");
        }
        if (response && response.events) {
          setEvents(response.events);
        } else {
          setEvents(null);
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    };

    const handler = async () => {
      const resp = await fetchUser();
      if (resp.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          navigate("/logout");
        } else {
          try {
            const response = await axios.request({
              baseURL: import.meta.env.VITE_APP_SERVER_ADDRESS,
              url: "/api/v1" + `/auth/refresh-token`,
              method: "POST",
              data: {
                refreshToken,
              },
            });
            localStorage.setItem("accessToken", response.data.accessToken);
            await fetchUser();
          } catch {
            navigate("/logout");
          }
        }
      }
      await fetchEvents();
    };

    handler();
  }, []);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      <EventsDataContext.Provider value={{ events, setEvents }}>
        <Outlet />
      </EventsDataContext.Provider>
    </UserDataContext.Provider>
  );
}
