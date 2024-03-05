import _ from "lodash";
import rawData from "../__mocks__/example_mapping.json";
import { THEME } from "../constants/metrics";
import { Chart } from "react-google-charts";
import { usePortfolioData } from "../hooks/usePortfolioData";
import React from "react";

const ExposureHistory = () => {
  const portfolioData = usePortfolioData();

  const portfolioByCategory = _(rawData)
    .filter((i) => _.includes(portfolioData.isins, i.isin))
    .groupBy((i) => i.year)
    .mapValues((yearData) => {
      const themeRevenues = _.mapValues(THEME, (t) =>
        _(yearData)
          .filter((i) => i[t])
          .sumBy((i) => i.product_category_revenues),
      );

      const themeRevenue = _.mean(_.values(themeRevenues));

      const fullRevenue = _(yearData).sumBy((i) => i.product_category_revenues);

      return themeRevenue / fullRevenue;
    })
    .toPairs()
    .sortBy(([year]) => year)
    .value();

  const chartData = [["Year", "Overall exposure"], ...portfolioByCategory];

  const options = {
    titleTextStyle: {
      color: "white",
    },
    backgroundColor: "#1f2937",
    lineWidth: 3,
    colors: ["#2dd4bf"],
    curveType: "function",
    legend: {
      position: "bottom",
      textStyle: {
        color: "white",
      },
    },
    hAxis: {
      textStyle: {
        color: "white",
      },
    },
    vAxis: {
      gridlines: { color: "grey", count: 3 },
      format: "percent",
      minValue: 0,
      textStyle: {
        color: "white",
      },
    },
  };

  return (
    <>
      <h1 className="text-2xl">Exposure over Time</h1>
      <p className="text-gray-400 text-sm mb-3">
        Chart shows how exposure changes over time
      </p>
      <Chart
        chartType="LineChart"
        width="80%"
        height="500px"
        data={chartData}
        options={options}
      />
    </>
  );
};

export default ExposureHistory;
