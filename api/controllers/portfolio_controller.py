import yfinance as yf
from sqlalchemy import exc
from ..db import db
from ..models.portfolio import Portfolio

#hardcoded userID for now
def create_portfolio(request):
  new_portfolio = Portfolio(UserId=request['UserId'], Name=request['Name'])
  db.session.add(new_portfolio)

  db.session.commit()

  #code to get alchemy error-wrap around db commit
  # try:
  # except exc.SQLAlchemyError:
  # print("DB exception")
