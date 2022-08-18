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
def update_share_info(ticker):
  yfinance_ticker = ticker + ".AX"
  print(yfinance_ticker)
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


