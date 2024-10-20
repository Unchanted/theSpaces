import { useEffect, useState } from "react";
import { UserDataContext } from "../contexts/userContext";
import { useNavigate, Outlet } from "react-router-dom";

import axios from "axios";

export default function Protected() {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    console.log(import.meta.env.VITE_SERVER_URL);
    const fetchUsers = async () => {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/users"
      );
      const data = response.data;
      console.log(data);

      if (!localUser) {
        // navigate("/login");
        return;
      }

      for (let i = 0; i < data.length; i++) {
        if (data[i].email === localUser.email) {
          setUserData(data[i]);
          return;
        }
      }
      navigate("/login");
    };
    fetchUsers();
  }, []);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      <Outlet />
    </UserDataContext.Provider>
  );
}
