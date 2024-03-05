import React from "react";
import { Menu } from "primereact/menu";
import { NavLink } from "react-router-dom";

const NavMenu = () => {
  const items = [
    {
      template: () => (
        <NavLink
          to="/portfolios"
          className="flex gap-2 w-full align-content-start p-3 text-white"
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
          className="flex gap-2 w-full align-content-start p-3 text-white"
        >
          <span className="pi pi-chart-bar" />
          Top Companies
        </NavLink>
      ),
    },
  ];

  return (
    <div>
      <Menu model={items} />
    </div>
  );
};

export default NavMenu;
