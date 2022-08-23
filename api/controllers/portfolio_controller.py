import yfinance as yf
from sqlalchemy import exc
from ..db import db
from ..models.portfolio import Portfolio, PortfolioShares
from ..schemas.portfolio_schemas import portfolio_schema

#hardcoded userID for now
def create_portfolio(request):
  new_portfolio = Portfolio(UserId=request['UserId'], Name=request['Name'])
  db.session.add(new_portfolio)
  db.session.commit()

def create_portfolio_buy(request):
  new_buy = PortfolioShares(
    PortfolioId=request.get('PortfolioId'), 
    ShareId=request.get('ShareId'), 
    Qty=request.get('Qty'),
    AquiredDate=request.get('AquiredDate'),
    Cost=request.get('Cost')
  )
  db.session.add(new_buy)
  db.session.commit()

