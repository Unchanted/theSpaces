import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-16 p-4">
      <div className="flex flex-col w-full h-44 items-center align-middle justify-end">
        {/* <img src={EventioLogo} alt="Eventio" className="h-20 w-20" /> */}
      </div>
      <div className="fiex gap-4 justify-center items-center text-center">
        <p className="font-marcellus text-primary text-3xl">theSpaces</p>
        <br></br>
        <p className="text-sm text-foreground ">By OOO</p>
      </div>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const credential = credentialResponse.credential;
          const decoded = jwtDecode(credential);
          localStorage.setItem("token", JSON.stringify(decoded));

          try {
            const response = await axios.post(
              import.meta.env.VITE_SERVER_URL + "/users",
              {
                email: decoded.email,
                name: decoded.name,
                photo_url: decoded.picture,
              }
            );
            const data = response.data;
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/");
          } catch (error) {
            console.error("Error: ", error);
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}
