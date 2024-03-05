import React from "react";
import "./App.css";
import TopCompanies from "./components/TopCompanies";
import PortfolioReport from "./components/PortfolioReport";
import PortfolioProducts from "./components/PortfolioProducts";
import ExposureHistory from "./components/ExposureHistory";
import NavMenu from "./components/NavMenu";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Portfolios from "./components/Portfolios";
import { Card } from "primereact/card";
import PortfolioPage from "./components/PortfolioPage";
import SunburstChart from "./components/Sunburst";

function App() {
  return (
    <div className="flex">
      <Router>
        <NavMenu />
        <div className="p-4 w-full overflow-y-auto h-screen">
          <Routes>
            <Route path="/" element={<Navigate to="/portfolios" replace />} />
            <Route
              path="/portfolios"
              element={
                <Card>
                  <h1 className="mt-0 text-3xl">Portfolios</h1>
                  <Portfolios />
                </Card>
              }
            />
            <Route
              path={"/portfolios/:portfolioId"}
              element={<PortfolioPage />}
            >
              <Route path="products" element={<PortfolioProducts />} />
              <Route path="overview" element={<PortfolioReport />} />
              <Route path="exposure" element={<ExposureHistory />} />
              <Route path="product-impact" element={<SunburstChart />} />
            </Route>
            <Route path="/top-companies" element={<TopCompanies />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
