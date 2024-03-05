import _ from "lodash";
import rawData from "../__mocks__/example_mapping.json";
import {
  getSortedCompanies,
  getThemeSustainability,
} from "../utils/transformations";
import { THEME, THEME_NAMES, YEAR } from "../constants/metrics";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";
import { Card } from "primereact/card";

const themes = [
  { name: "Overall Score", code: "All" },
  ...Object.values(THEME).map((code) => ({ name: THEME_NAMES[code], code })),
];

const TopCompanies = () => {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  const lastYearData = _.chain(rawData)
    .filter({ year: YEAR })
    .groupBy("isin")
    .value();

  const themeDataByIsin = getThemeSustainability(
    lastYearData,
    selectedTheme.code as THEME | "All",
  );

  const sortedData = getSortedCompanies(themeDataByIsin);

  return (
    <>
      <Card>
        <div className="flex justify-content-between align-content-center mb-4">
          <h1 className="text-3xl m-0">Top Companies by Theme Impact</h1>
          <Dropdown
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.value)}
            options={themes}
            optionLabel="name"
            placeholder="Select a Theme"
            className="w-full md:w-14rem"
          />
        </div>
        <DataTable value={sortedData} tableStyle={{ minWidth: "50rem" }}>
          <Column field="rank" header="Rank"></Column>
          <Column field="isin" header="ISIN"></Column>
          <Column field="companyName" header="Company"></Column>
          <Column
            field="value"
            header="Score"
            body={(product) => (
              <Badge
                severity={product.value > 0.5 ? "success" : "info"}
                value={product.value.toFixed(2)}
              />
            )}
          ></Column>
        </DataTable>
      </Card>
    </>
  );
};

export default TopCompanies;
