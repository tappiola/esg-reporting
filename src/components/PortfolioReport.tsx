import _ from "lodash";
import rawData from "../__mocks__/example_mapping.json";
import myPortfolioIsins from "../__mocks__/my_portfolio_1.json";
import { THEME, THEME_NAMES, YEAR } from "../constants/metrics";
import { Knob } from "primereact/knob";

const PortfolioReport = () => {
  const lastYearData = _(rawData)
    .filter((i) => myPortfolioIsins.includes(i.isin) && i.year === YEAR)
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
    <div className="flex gap-3 justify-content-center">
      {Object.values(THEME).map((theme) => (
        <div className="flex flex-column">
          <p>{THEME_NAMES[theme]}</p>
          <Knob
            value={Math.round((100 * getGoodRevenue(theme)) / totalRevenue)}
            min={0}
            max={100}
          />
        </div>
      ))}
    </div>
  );
};

export default PortfolioReport;
