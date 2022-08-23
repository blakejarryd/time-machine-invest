export interface Shares {
  Employees?: number;
  Id?: number;
  Name?: string;
  Sector?: string;
  Summary?: string;
  Ticker?: string
}

export interface Share {
  Id?: number;
  Name?: string;
  Sector?: string;
  Industry?: string;
  Employees?: number;
  Summary?: string;
  Website?: string;
  LogoUrl?: string;
  DividendYield?: number;
  MarketCap?: number;
  Ticker?: string
}

export interface Price {
  Date?: string
  Id?: number
  Price?: number
  ShareId?: number
}

export interface PortfolioInterface {
  Id?: number
  Name?: string
  PortfolioShares?: []
  UserId: number
}

export interface SelectedPortfolio {
  Id?: number
  Name?: string
}


