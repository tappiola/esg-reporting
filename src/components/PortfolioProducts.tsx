import _ from "lodash";
import rawData from "../__mocks__/example_mapping.json";
import myPortfolioIsins from "../__mocks__/my_portfolio_2.json";
import { YEAR } from "../constants/metrics";
import { Chart } from "react-google-charts";

const PortfolioReport = () => {
  const lastYearData = _(rawData)
    .filter((i) => myPortfolioIsins.includes(i.isin) && i.year === YEAR)
    .value();

  const portfolioByCategory = _(lastYearData)
    .groupBy((i) => i.product_category)
    .mapValues((v) => _.sumBy(v, (i) => i.product_category_revenues))
    .toPairs()
    .sortBy(([category, revenue]) => -revenue)
    .value();

  console.log({ portfolioByCategory });

  const chartData = [["Category", "Revenue"], ...portfolioByCategory];
  console.log({ chartData });

  const options = {
    title: "Portfolio by categories",
    titleTextStyle: {
      color: "white",
    },
    backgroundColor: "#1f2937",
    pieHole: 0.4,
    // colors: [
    //   "582f0e",
    //   "7f4f24",
    //   "936639",
    //   "a68a64",
    //   "b6ad90",
    //   "c2c5aa",
    //   "a4ac86",
    //   "656d4a",
    //   "414833",
    //   "333d29",
    // ],
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

  // const chartOptions = {
  //   cutout: "40%",
  // };
  //
  // const data = {
  //   labels: portfolioByCategory.map(([k, v]) => k),
  //   datasets: [
  //     {
  //       data: portfolioByCategory.map(([k, v]) => v),
  //     },
  //   ],
  // };

  return (
    <div>
      <Chart
        chartType="PieChart"
        data={chartData}
        options={options}
        width={"80%"}
        height={"500px"}
      />
      <div className="card flex justify-content-center">
        {/*<Chart2*/}
        {/*  type="doughnut"*/}
        {/*  data={data}*/}
        {/*  options={chartOptions}*/}
        {/*  className="w-full md:w-30rem"*/}
        {/*/>*/}
      </div>
    </div>
  );
};

export default PortfolioReport;
