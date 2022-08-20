export interface Shares {
  Employees?: number;
  Id?: number;
  Name?: string;
  Sector?: string;
  Summary?: string;
  Ticker?: string
}[]

export interface Share {
  Employees?: number;
  Id?: number;
  Name?: string;
  Sector?: string;
  Summary?: string;
  Ticker?: string
}

export interface Price {
  Date?: string
  Id?: number
  Price?: number
  ShareId?: number
}