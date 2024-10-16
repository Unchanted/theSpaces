import { Calendar, Home, People, ProfileCircle } from "iconsax-react";

import { NavLink } from "react-router-dom";

function NavbarItem({ Icon, text, to }) {
  return (
    <NavLink to={to} className="flex flex-col items-center">
      {({ isActive }) => (
        <>
          <Icon
            variant={isActive ? "Bold" : "Linear"}
            color={isActive ? "#B61F2D" : "#57585A"} // TODO: Pass from tailwind theme
          />
          <span
            className={`text-xs font-marcellus ${isActive ? "text-primary" : "text-mute "}`}
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
      <NavbarItem Icon={Home} text="Home" to="/" />
      <NavbarItem Icon={Calendar} text="Calendar" to="/calendar" />
      <NavbarItem Icon={People} text="Councils" to="/councils" />
      <NavbarItem Icon={ProfileCircle} text="Profile" to="/profile" />
    </div>
  );
}
