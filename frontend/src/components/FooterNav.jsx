import { Home, Message, MessageAdd1, Box1 } from "iconsax-react";
import { NavLink, Link } from "react-router-dom";

function NavbarItem({ Icon, text, to }) {
  return (
    <NavLink to={to} className="flex flex-col items-center">
      {({ isActive }) => (
        <>
          <Icon
            variant={isActive ? "Bold" : "Linear"}
            color={isActive ? "#d16421" : "#d16421"} // TODO: Pass from tailwind theme
          />{" "}
          <span
            className={`text-xs ${isActive ? "text-primary" : "text-mute "}`}
          >
            {text}
          </span>
        </>
      )}
    </NavLink>
  );
}

export default function FooterNav() {
  return (
    <div className="h-20 fixed bottom-0 left-0 w-full flex flex-row justify-around pt-3 z-10 shadow-2xl bg-background">
      <NavbarItem Icon={Home} text="My Spaces" to="/" />
      <NavbarItem Icon={Box1} text="SpaceList" to="/spaces" />
      <NavbarItem Icon={Message} text="Gupshup AI" to="/gupshup" />
      <Link
        to="/spaces/create"
        className="flex flex-row gap-2 fixed items-center bottom-24 right-4 p-3 bg-primary text-white rounded-tl-full rounded-tr-full rounded-br-full shadow-lg"
      >
        <MessageAdd1 size="22" />
        <p className="text-xs font-bold">New Space</p>
      </Link>
    </div>
  );
}
