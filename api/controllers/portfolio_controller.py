import json
import yfinance as yf
from sqlalchemy import exc
from ..db import db
from ..models.portfolio import Portfolio, PortfolioShares
from ..schemas.portfolio_schemas import portfolio_schema
from ..models.share import Share, SharePrice
from ..schemas.share_shemas import share_schema, share_price_schema

def create_portfolio(request):
  new_portfolio = Portfolio(UserId=request['UserId'], Name=request['Name'])
  db.session.add(new_portfolio)
  db.session.commit()
  new_portfofolio_list = []
  new_portfofolio_list.append(new_portfolio)
  return new_portfofolio_list

def create_portfolio_buy(request):
  print(request['shareId'])
  priceQuery = SharePrice.query.filter(SharePrice.ShareId==request['shareId'], SharePrice.Date<request['date']).order_by(SharePrice.Date.desc()).limit(1).all()
  print(priceQuery)
  data = share_price_schema.dump(priceQuery)
  print(data)
  price = data[0]['Price']
  print(price)
  qty = request['amount']//price
  print(qty)
  cost = qty * price
  print(cost)
  new_buy = PortfolioShares(
    PortfolioId=request.get('portfolioId'), 
    ShareId=request.get('shareId'), 
    Qty=qty,
    AquiredDate=request.get('date'),
    Cost=cost
  )
  db.session.add(new_buy)
  db.session.commit()

