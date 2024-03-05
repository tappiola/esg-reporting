import React from "react";
import { Menu } from "primereact/menu";
import { NavLink } from "react-router-dom";

const NavMenu = () => {
  const items = [
    {
      template: () => (
        <NavLink
          to="/portfolios"
          className="flex gap-2 w-full align-content-start p-3 text-white border-round-sm no-underline"
        >
          <span className="pi pi-briefcase" />
          Portfolios
        </NavLink>
      ),
    },
    {
      template: () => (
        <NavLink
          to="/top-companies"
          className="flex gap-2 w-full align-content-start p-3 text-white border-round-sm no-underline"
        >
          <span className="pi pi-chart-bar" />
          Top Companies
        </NavLink>
      ),
    },
  ];

  return (
    <nav className="h-screen bg-bluegray-900 p-2 pt-8">
      <Menu model={items} />
    </nav>
  );
};

export default NavMenu;
