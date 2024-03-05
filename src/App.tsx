import React from "react";
import "./App.css";
import TopCompanies from "./components/TopCompanies";
import PortfolioReport from "./components/PortfolioReport";
import PortfolioProducts from "./components/PortfolioProducts";
import ExposureHistory from "./components/ExposureHistory";
import NavMenu from "./components/NavMenu";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DonutChart from "./components/Sunburst";

function App() {
  return (
    <div className="App">
      <Router>
        <NavMenu />
        <Routes>
          <Route
            path="/portfolios"
            element={<h3>Please select a portfolio.</h3>}
          />
          <Route
            path={"/portfolios/:portfolioId"}
            element={
              <>
                <PortfolioProducts />
                <PortfolioReport />
                <ExposureHistory />
                <DonutChart
                  data={[
                    {
                      product: "product 1",
                      revenueShare: 10,
                      themesCovered: 1,
                    },
                    {
                      product: "product 2",
                      revenueShare: 30,
                      themesCovered: 2,
                    },
                    {
                      product: "product 3",
                      revenueShare: 60,
                      themesCovered: 3,
                    },
                  ]}
                />
              </>
            }
          />
          <Route path="/top-companies" element={<TopCompanies />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
