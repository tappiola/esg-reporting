export enum THEME {
  "HUMAN_MOBILITY" = "human_mobility",
  "MENTAL_WELLBEING" = "mental_wellbeing",
}

export const THEME_NAMES = {
  [THEME.HUMAN_MOBILITY]: "Human Mobility",
  [THEME.MENTAL_WELLBEING]: "Mental Wellbeing",
};

export const YEAR = 2022;

export interface ThemeData {
  isin: string;
  ticker: string;
  exchange: string;
  bbg_ticker: string;
  bbg_exchange: string;
  year: number;
  company_name: string;
  dom_region: string;
  dom_country: string;
  economic_sector: string;
  industry: string;
  product_category: string;
  product_category_revenues: number;
  total_revenues: number;
  human_mobility: boolean;
  mental_wellbeing: boolean;
}
