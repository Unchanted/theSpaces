import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

import Loader from "./components/Loader";

function App() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > window.innerHeight) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile === null) {
    return <Loader />;
  } else if (isMobile) {
    return (
      <div className="flex flex-col h-screen justify-center items-center gap-8">
        <p className="font-poppins text-3xl text-primary ">Mobile Required</p>
        <p className="font-poppins text-xl text-foreground ">
          Please use a mobile device and install the app to continue.
        </p>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
