import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Protected from "../layouts/Protected";
import FooterLayout from "../layouts/FooterLayout";

import Login from "../pages/Login";
import Logout from "../pages/Logout";

import Home from "../pages/Home";
import MySpaces from "../pages/MySpaces";
import SpaceForm from "../pages/SpaceForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route Component={Protected}>
        <Route component={FooterLayout}>
          <Route index Component={Home} />
          <Route path="space" Component={MySpaces} />
          <Route path="spaceform" Component={SpaceForm} />
        </Route>
      </Route>
      <Route path="login" Component={Login} />
      <Route path="logout" Component={Logout} />
    </Route>,
  ),
);

export default router;
