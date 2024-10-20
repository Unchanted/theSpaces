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

import SpaceForm from "../pages/SpaceForm";
import SpaceChat from "../pages/SpaceChat";
import SpaceList from "../pages/SpaceList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route Component={Protected}>
        <Route Component={FooterLayout}>
          <Route index Component={Home} />
          <Route path="spaceform" Component={SpaceForm} />
          <Route path="spacelist" Component={SpaceList} />
        </Route>
        <Route path="spacechat" Component={SpaceChat} />
      </Route>
      <Route path="login" Component={Login} />
      <Route path="logout" Component={Logout} />
    </Route>,
  ),
);

export default router;
