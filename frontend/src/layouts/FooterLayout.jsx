import FooterNav from "../components/FooterNav";
import { Outlet } from "react-router-dom";

export default function FooterLayout() {
  return (
    <>
      <Outlet />
      <FooterNav />
    </>
  );
}
