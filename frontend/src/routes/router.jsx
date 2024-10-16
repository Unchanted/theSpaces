import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Login from "../screens/Login";

import Home from "../pages/Home";
import Space from "../pages/Space";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />} />,
    <Route path="/space" element={<Space />} />,
    <Route path="/login" element={<Login />} />,
  ),
);

export default router;
