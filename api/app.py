from flask import Flask, request, jsonify, make_response
import yfinance as yf
from .commands import commands
from .db import db
from .ma import ma
from .models.share import Share
from .schemas.share_shemas import share_schema
from .schemas.portfolio_schemas import portfolio_schema
from .schemas.user_schemas import user_schema
from .controllers.share_controller import (
  calculate_start_date, 
  get_info_yf, 
  load_share_info, 
  get_price_data, 
  get_share_db, 
  load_price_data
)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://invest_app:invest_app@localhost/timemachineinvest'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.app_context().push()
db.init_app(app)
ma.init_app(app)

for command in commands:
  app.cli.add_command(command)

@app.route('/shares')
def shares():
  shares = Share.query.all()
  return share_schema.dump(shares)

@app.route('/shares/<ticker>')
def share_info(ticker):
  share = Share.query.filter_by(Ticker=ticker)
  return share_schema.dump(share)

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



