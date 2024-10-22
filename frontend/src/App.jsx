import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

// import Loader from "./components/Loader";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
