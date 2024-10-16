import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        <img src={EventioLogo} alt="Eventio" className="h-20 w-20" />
      </div>
      <div className="fiex justify-center items-center text-center">
        <p className="font-marcellus text-primary text-3xl">
          Kitna hua padh ke gaiz
        </p>
        <p className="text-sm text-foreground ">By OOO</p>
      </div>
      <button
        onClick={login}
        className="flex items-center gap-3 p-4 outline outline-sky-500 rounded-xl text-sky-500 text-xl font-bold"
      >
        <img
          src="https://docs.material-tailwind.com/icons/google.svg"
          alt="metamask"
          className="h-6 w-6"
        />
        Continue with Google
      </button>
    </div>
  );
}
