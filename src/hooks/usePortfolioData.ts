import { useParams } from "react-router";
import myPortfolios from "../__mocks__/my_portfolios.json";

export const usePortfolioData = () => {
  const { portfolioId } = useParams();

  return myPortfolios.find(({ id }) => id === portfolioId)!;
};
