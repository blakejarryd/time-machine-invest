from flask import Flask, request, jsonify, make_response
import yfinance as yf
from .commands import commands
from .db import db
from .ma import ma
from .models.share import Share, SharePrice
from .schemas.share import share_schema

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
  yfinance_ticker = ticker + ".AX"
  share = yf.Ticker(yfinance_ticker)
  info = share.info
  # print(info['sector'])
  db_share = Share.query.filter_by(Ticker=ticker).first()
  db_share.Sector = info['sector']
  db_share.Employees = info['fullTimeEmployees']
  db_share.Summary = info['longBusinessSummary']
  db.session.add(db_share)
  db.session.commit()
  resp = jsonify(success=True)
  return resp

@app.route('/load/prices/<ticker>')
def get_share_price(ticker):
  start = '2022-07-01'
  if request.args:
    args = request.args.to_dict()
    from_date = args['from']
    start = from_date
  yfinance_ticker = ticker + ".AX"
  share = yf.Ticker(yfinance_ticker)
  prices = share.history(start=start)
  prices.reset_index(inplace=True)
  prices['Date'] = prices['Date'].dt.strftime('%Y-%m-%d')
  prices.drop(['Dividends','Stock Splits', 'Open', 'High', 'Low', 'Volume'], inplace=True, axis=1)
  pricesList = prices.to_dict(orient='records')
  db_share = Share.query.filter_by(Ticker=ticker).first()
  db_prices = [SharePrice(ShareId=db_share.Id, Date=price['Date'], Price=round(price['Close'],2)) for price in pricesList]
  db.session.add_all(db_prices)
  db.session.commit()
  resp = jsonify(success=True)
  return resp



