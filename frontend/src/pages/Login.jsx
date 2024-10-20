import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const navigate = useNavigate();
  const login = () => {
    window.open(
      import.meta.env.VITE_APP_SERVER_ADDRESS + "/api/v1/auth/google",
      "_self",
    );
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessTokenParam = urlParams.get("accessToken");
    const refreshTokenParam = urlParams.get("refreshToken");

    if (accessTokenParam && refreshTokenParam) {
      localStorage.setItem("accessToken", accessTokenParam);
      localStorage.setItem("refreshToken", refreshTokenParam);
      window.history.replaceState(null, "", window.location.pathname);
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-16 p-4">
      <div className="flex flex-col w-full h-44 items-center align-middle justify-end">
        {/* <img src={EventioLogo} alt="Eventio" className="h-20 w-20" /> */}
      </div>
      <div className="fiex gap-4 justify-center items-center text-center">
        <p className="font-marcellus text-primary text-3xl">
          Kitna hua padh ke gaiz
        </p>
        <br></br>
        <p className="text-sm text-foreground ">By OOO</p>
      </div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      ;
    </div>
  );
}
