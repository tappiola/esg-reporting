import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import myPortfolios from "../__mocks__/my_portfolios.json";
import { NavLink } from "react-router-dom";

const Portfolios = () => {
  return (
    <DataTable value={myPortfolios} tableStyle={{ minWidth: "50rem" }}>
      <Column
        field="name"
        header="Name"
        body={(portfolio) => (
          <NavLink
            className="text-teal-200 font-semibold hover:no-underline"
            to={`${portfolio.id}/overview`}
          >
            {portfolio.name}
          </NavLink>
        )}
      ></Column>
      <Column
        field="value"
        header="Number of companies"
        body={(portfolio) => portfolio.isins.length}
      ></Column>
    </DataTable>
  );
};

export default Portfolios;
