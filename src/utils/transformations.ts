import _ from "lodash";
import { THEME, ThemeData } from "../constants/metrics";

export const getThemeSustainability = (
  data: { [key: string]: ThemeData[] },
  theme: THEME | "All",
) =>
  _.mapValues(data, (items) => {
    const totalRevenue = items[0].total_revenues;
    const themeRevenue =
      theme !== "All"
        ? _.chain(items)
            .filter((i) => i[theme])
            .sumBy((item) => item.product_category_revenues)
            .value()
        : _.mean(
            Object.values(THEME).map((theme) =>
              _.chain(items)
                .filter((i) => i[theme])
                .sumBy((item) => item.product_category_revenues)
                .value(),
            ),
          );

    return {
      companyName: items[0].company_name,
      value: themeRevenue / totalRevenue,
      totalRevenue,
    };
  });

export const getSortedCompanies = (data: {
  [key: string]: { companyName: string; value: number; totalRevenue: number };
}) =>
  _(data)
    .toPairs()
    .sortBy([([_, data]) => data.value, ([isin, data]) => data.totalRevenue])
    .reverse()
    .map(([isin, data], index) => ({ rank: index + 1, isin, ...data }))
    .slice(0, 15)
    .value();
