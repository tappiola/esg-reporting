import _ from "lodash";
import rawData from "../__mocks__/example_mapping.json";
import { YEAR } from "../constants/metrics";
import { Chart } from "react-google-charts";
import React from "react";
import { usePortfolioData } from "../hooks/usePortfolioData";

const PortfolioReport = () => {
  const portfolioData = usePortfolioData();

  const lastYearData = _(rawData)
    .filter((i) => portfolioData.isins.includes(i.isin) && i.year === YEAR)
    .value();

  const portfolioByCategory = _(lastYearData)
    .groupBy((i) => i.product_category)
    .mapValues((v) => _.sumBy(v, (i) => i.product_category_revenues))
    .toPairs()
    .sortBy(([category, revenue]) => -revenue)
    .value();

  const chartData = [["Category", "Revenue"], ...portfolioByCategory];

  const options = {
    titleTextStyle: {
      color: "white",
    },
    backgroundColor: "#1f2937",
    pieHole: 0.4,
    sliceVisibilityThreshold: 0.04,
    pieSliceTextStyle: {
      fontSize: 12,
      color: "white",
    },
    legend: {
      textStyle: {
        color: "white",
      },
    },
  };

  return (
    <>
      <h1 className="text-2xl">Portfolio by categories</h1>
      <p className="text-gray-400 text-sm mb-3">
        Revenue distribution between products and services in portfolio
      </p>
      <Chart
        chartType="PieChart"
        data={chartData}
        options={options}
        width="1200px"
        height="500px"
      />
      <div className="card flex justify-content-center"></div>
    </>
  );
};

export default PortfolioReport;
