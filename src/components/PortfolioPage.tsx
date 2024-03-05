import { Outlet, useNavigate } from "react-router";
import { Card } from "primereact/card";
import React from "react";
import { Link } from "react-router-dom";
import { BreadCrumb } from "primereact/breadcrumb";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { TabMenu } from "primereact/tabmenu";

const PortfolioPage = () => {
  const portfolioData = usePortfolioData();
  const navigate = useNavigate();

  const items = [
    {
      label: "Overview",
      icon: "pi pi-home",
      command: () => {
        navigate("overview");
      },
    },
    {
      label: "Products",
      icon: "pi pi-palette",
      command: () => {
        navigate("products");
      },
    },
    {
      label: "Product Impact",
      icon: "pi pi-chart-pie",
      command: () => {
        navigate("product-impact");
      },
    },
    {
      label: "Exposure",
      icon: "pi pi-chart-line",
      command: () => {
        navigate("exposure");
      },
    },
  ];

  return (
    <>
      <BreadCrumb
        className="mb-4"
        model={[
          {
            template: () => (
              <Link
                to="/portfolios"
                className="text-white font-bold no-underline"
              >
                {portfolioData?.name}
              </Link>
            ),
          },
        ]}
        home={{
          template: () => (
            <Link to="/portfolios" className="text-gray-300 no-underline">
              Portfolios
            </Link>
          ),
        }}
      />

      <Card id="portfolio" className="mt-0 min-h-300">
        <TabMenu model={items} className="mb-5" />
        <Outlet />
      </Card>
    </>
  );
};

export default PortfolioPage;
