import yfinance as yf
from ..db import db
from ..models.share import Share, SharePrice

def get_share_db(ticker):
  share = Share.query.filter_by(Ticker=ticker).first()
  if share:
    return share

def get_info_yf(ticker):
  yfinance_ticker = ticker + ".AX"
  share = yf.Ticker(yfinance_ticker)
  info = share.info
  print(info)
  return info

def load_share_info(share, info):
  share.Sector = info.get('sector')
  share.Industry = info.get('industry')
  share.Employees = info.get('fullTimeEmployees')
  share.Summary = info.get('longBusinessSummary')
  share.Website = info.get('website')
  share.LogoUrl = info.get('logo_url')
  share.DividendYield = info.get('dividendYield')
  share.MarketCap = info.get('marketCap')
  share.CurrentPrice = info.get('currentPrice')
  db.session.add(share)
  db.session.commit()

# To do - get start date based of existing share price data
def calculate_start_date(ticker, args):
  start = '2022-07-01'
  if args:
    args = args.to_dict()
    from_date = args['from']
    start = from_date
  return start

def get_price_data(ticker, from_date):
  yfinance_ticker = ticker + ".AX"
  share = yf.Ticker(yfinance_ticker)
  prices = share.history(start=from_date)
  prices.reset_index(inplace=True)
  prices['Date'] = prices['Date'].dt.strftime('%Y-%m-%d')
  prices.drop(['Dividends','Stock Splits', 'Open', 'High', 'Low', 'Volume'], inplace=True, axis=1)
  price_dict = prices.to_dict(orient='records')
  return price_dict

def load_price_data(share_id, price_data):
  for price in price_data:
    existing_price = SharePrice.query.filter_by(ShareId=share_id, Date=price['Date']).first()
    if not existing_price:
      new_price = SharePrice(ShareId=share_id, Date=price['Date'], Price=round(price['Close'],2))
      db.session.add(new_price)
      db.session.commit()