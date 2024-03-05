import _ from "lodash";
import rawData from "../__mocks__/example_mapping.json";
import myPortfolioIsins from "../__mocks__/my_portfolio_2.json";
import { THEME } from "../constants/metrics";
import { Chart } from "react-google-charts";

const ExposureHistory = () => {
  const portfolioByCategory = _(rawData)
    .filter((i) => _.includes(myPortfolioIsins, i.isin))
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

  console.log({ portfolioByCategory });

  const chartData = [["Year", "Overall exposure"], ...portfolioByCategory];
  console.log({ chartData });

  const options = {
    title: "Portfolio exposure over time",
    titleTextStyle: {
      color: "white",
    },
    backgroundColor: "#1f2937",
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
      format: "percent",
      minValue: 0,
      textStyle: {
        color: "white",
      },
    },
  };

  return (
    <div>
      <Chart
        chartType="LineChart"
        width="80%"
        height="500px"
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default ExposureHistory;
