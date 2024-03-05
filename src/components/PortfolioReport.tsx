import _ from "lodash";
import rawData from "../__mocks__/example_mapping.json";
import { THEME, THEME_NAMES, YEAR } from "../constants/metrics";
import { Knob } from "primereact/knob";
import React from "react";
import { usePortfolioData } from "../hooks/usePortfolioData";

const PortfolioReport = () => {
  const portfolioData = usePortfolioData();
  const lastYearData = _(rawData)
    .filter((i) => portfolioData.isins.includes(i.isin) && i.year === YEAR)
    .value();

  const totalRevenue = _(lastYearData)
    .sumBy((item) => item.product_category_revenues)
    .valueOf();

  const getGoodRevenue = (theme: THEME) =>
    _(lastYearData)
      .filter((i) => i[theme])
      .sumBy((i) => i.product_category_revenues)
      .valueOf();

  return (
    <>
      <h1 className="text-2xl">Theme Impact</h1>
      <p className="text-gray-400 text-sm mb-3">
        Impact of products and services to sustainability themes
      </p>
      <div className="flex gap-4 justify-content-center">
        {Object.values(THEME).map((theme) => (
          <div className="flex flex-column align-items-center">
            <p className="font-semibold">{THEME_NAMES[theme]}</p>
            <Knob
              value={Math.round((100 * getGoodRevenue(theme)) / totalRevenue)}
              min={0}
              max={100}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default PortfolioReport;
