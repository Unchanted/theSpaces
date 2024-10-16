import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Protected from "../layouts/Protected";

import Login from "../pages/Login";
import Logout from "../pages/Logout";

import Home from "../pages/Home";
import Space from "../pages/Space";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route Component={Protected}>
        <Route index Component={Home} />
        <Route path="space" Component={Space} />
      </Route>
      <Route path="login" Component={Login} />
      <Route path="logout" Component={Logout} />
    </Route>,
  ),
);

export default router;
