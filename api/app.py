import json
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import yfinance as yf
from .commands import commands
from .db import db
from .ma import ma
from .models.share import Share, SharePrice
from .models.user import User
from .models.portfolio import Portfolio, PortfolioShares
from .schemas.share_shemas import share_schema, share_price_schema
from .schemas.portfolio_schemas import portfolio_schema, portfolio_shares_schema
from .schemas.user_schemas import user_schema
from .controllers.share_controller import (
  calculate_start_date, 
  get_info_yf, 
  load_share_info, 
  get_price_data, 
  get_share_db, 
  load_price_data
)
from .controllers.user_controller import (
  create_user
)
from .controllers.portfolio_controller import (
  create_portfolio,
  create_portfolio_buy
)

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://invest_app:invest_app@localhost/timemachineinvest'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.app_context().push()
db.init_app(app)
ma.init_app(app)

for command in commands:
  app.cli.add_command(command)

session = db.session()
# q = session.query(Share).all()
# print(q)
########################################################################
# SHARE ROUTES
########################################################################
@app.route('/shares')
def shares():
  shares = Share.query.with_entities(Share.Id, Share.Ticker, Share.Name).order_by(Share.MarketCap.desc().nullslast())
  return share_schema.dump(shares)
@app.route('/shares/<ticker>')
def share_info(ticker):
  share = Share.query.filter_by(Ticker=ticker)
  return share_schema.dump(share)

########################################################################
# PRICE ROUTES
########################################################################
@app.route('/prices/<ticker>')
def get_prices(ticker):
  prices = session.query(SharePrice).join(Share).filter(Share.Ticker==ticker).order_by(SharePrice.Date.desc())
  return share_price_schema.dump(prices)

########################################################################
# LOAD ROUTES
########################################################################
@app.route('/load/info/<ticker>')
def get_share_info(ticker):
  share = get_share_db(ticker)
  if not share:
    resp = jsonify(f"{ticker} is an invalid ticker")
    return resp
  info = get_info_yf(share.Ticker)
  load_share_info(share, info)
  resp = jsonify(f"Company information for {ticker} has been loaded")
  return resp

@app.route('/load/prices/<ticker>')
def load_share_prices(ticker):
  share = get_share_db(ticker)
  if not share:
    resp = jsonify(f"{ticker} is an invalid ticker")
    return resp
  share_id = share.Id
  from_date = calculate_start_date(ticker, request.args)
  price_data = get_price_data(ticker, from_date)
  load_price_data(share_id, price_data)
  resp = jsonify(f"Price data from {from_date} for {ticker} has been loaded")
  return resp

########################################################################
# USER ROUTES
########################################################################
@app.route('/user', methods=['POST'])
def new_user():
  try:
    create_user(request.json)
  except:
    return jsonify("something went wrong")
  return jsonify("user created")

########################################################################
# PORTFOLIO ROUTES
########################################################################
@app.route('/portfolio', methods=['POST'])
def new_portfolio():
  try:
    create_portfolio(request.json)
  except Exception as e:
    print(e)
    return jsonify("something went wrong")
  return jsonify("portfolio created")

@app.route('/portfolio/buy', methods=['POST'])
def new_portfolio_buy():
  try:
    create_portfolio_buy(request.json)
  except Exception as e:
    print(e)
    return jsonify("something went wrong")
  return jsonify("portfolio buy created")

@app.route('/portfolio/<userId>')
def user_portfolios(userId):
  portfolios = Portfolio.query.filter_by(UserId=userId).all()
  return portfolio_schema.dump(portfolios)

@app.route('/portfolio/shares/<portfolioId>')
def portfolio_shares(portfolioId):
  query = session.query(PortfolioShares, Share).join(Share, PortfolioShares.ShareId==Share.Id).with_entities(PortfolioShares.Id, PortfolioShares.ShareId, Share.Ticker, PortfolioShares.AquiredDate, PortfolioShares.Qty, PortfolioShares.Cost).all()
  print(query)
  data = []
  for row in query:
    data.append(dict(row))
  print(data)
  return jsonify(data)


