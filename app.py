import os, sys; sys.path.append(os.path.dirname(os.path.realpath(__file__)))
from dotenv import load_dotenv
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
from config.db import db
from config.ma import ma
from models.share import Share, SharePrice
from models.user import User
from models.portfolio import Portfolio, PortfolioShares
from schemas.share_shemas import share_schema, share_price_schema
from schemas.portfolio_schemas import portfolio_schema, portfolio_shares_schema
from schemas.user_schemas import user_schema
from seed.share_seed import source_shares
from controllers.share_controller import (
  calculate_start_date, 
  get_info_yf, 
  load_share_info, 
  get_price_data, 
  get_price_data_max,
  get_share_db, 
  load_price_data
)
from controllers.user_controller import (
  auth_check,
  create_user,
  login_user,
  logout_user
)
from controllers.portfolio_controller import (
  create_portfolio,
  create_portfolio_buy
)

app = Flask(__name__, static_folder='./client/build', static_url_path='/')
CORS(app)
app.secret_key = os.environ.get('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB_STRING')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.app_context().push()
db.init_app(app)
ma.init_app(app)

session = db.session()

@app.route('/')
def index():
    return app.send_static_file('index.html')

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

@app.route('/loadall/info')
def get_all_share_info():
  shares = Share.query.with_entities(Share.Ticker).all()
  share_tickers = share_schema.dump(shares)
  for ticker in share_tickers:
    try:
      info = get_info_yf(ticker['Ticker'])
      share = get_share_db(ticker['Ticker'])
      load_share_info(share, info)
      print(f"{ticker['Ticker']} info has been loaded")
    except Exception as e:
      print(e)
  resp = jsonify(f"Information for all companies has been loaded")
  return resp

@app.route('/load/prices/<ticker>')
def load_share_prices(ticker):
  share = get_share_db(ticker)
  if not share:
    resp = jsonify(f"{ticker} is an invalid ticker")
    return resp
  share_id = share.Id
  # from_date = calculate_start_date(ticker, request.args)
  price_data = get_price_data_max(ticker)
  load_price_data(share_id, price_data)
  resp = jsonify(f"Price data for {ticker} has been loaded")
  return resp

@app.route('/loadall/prices')
def get_all_share_prices():
  shares = Share.query.with_entities(Share.Id, Share.Ticker).all()
  share_data = share_schema.dump(shares)
  for share in share_data:
    try:
      price_data = get_price_data_max(share['Ticker'])
      load_price_data(share['Id'], price_data)
      print(f"{share['Ticker']} info has been loaded")
    except Exception as e:
      print(e)
  resp = jsonify(f"Prices for all companies has been loaded")
  return resp
########################################################################
# USER ROUTES
########################################################################
@app.route('/register', methods=['POST'])
def new_user():
  try:
    result = create_user(request.json)
  except:
    return jsonify("something went wrong")
  return result

@app.route('/login', methods=['POST'])
def login():
  try:
    result = login_user(request.json)
  except:
    return jsonify("something went wrong")
  return result

@app.route('/logout', methods=['POST'])
def logout():
  try:
    result = logout_user()
  except:
    return jsonify("something went wrong")
  return result

@app.route('/is-authenticated')
def is_authenticated():
  try:
    result = auth_check()
  except:
    return jsonify("something went wrong")
  return result

########################################################################
# PORTFOLIO ROUTES
########################################################################
@app.route('/portfolio', methods=['POST'])
def new_portfolio():
  try:
    newportfolio = create_portfolio(request.json)
  except Exception as e:
    print(e)
    return jsonify("something went wrong")
  return portfolio_schema.dump(newportfolio, many=True)

@app.route('/portfolio/buy', methods=['POST'])
def new_portfolio_buy():
  try:
    response = create_portfolio_buy(request.json)
  except Exception as e:
    print(e)
    return jsonify("something went wrong")
  return response

@app.route('/portfolio/<userId>')
def user_portfolios(userId):
  portfolios = Portfolio.query.filter_by(UserId=userId).all()
  return portfolio_schema.dump(portfolios)

@app.route('/portfolio/shares/<portfolioId>')
def portfolio_shares(portfolioId):
  query = session.query(PortfolioShares, Share).join(Share, PortfolioShares.ShareId==Share.Id).filter(PortfolioShares.PortfolioId==portfolioId).with_entities(PortfolioShares.Id, PortfolioShares.ShareId, Share.Ticker, Share.Name, Share.CurrentPrice, PortfolioShares.AquiredDate, PortfolioShares.Qty, PortfolioShares.Cost).all()
  data = []
  for row in query:
    data.append(dict(row))
  for obj in data:
    print(obj['Qty'])
    print(obj['CurrentPrice'])
    obj['CurrentValue'] = obj['Qty'] * obj['CurrentPrice']
    obj['CostPrice'] = obj['Cost']/obj['Qty']
    obj['Gain'] = obj['CurrentValue'] - obj['Cost']
  return jsonify(data)
  
@app.route('/portfolio/shares/<Id>', methods=['DELETE'])
def delete_portfolio_share(Id):
  buy = PortfolioShares.query.filter_by(Id=Id).first()
  db.session.delete(buy)
  db.session.commit()
  return jsonify("share record deleted")

@app.route('/portfolio/<Id>', methods=['DELETE'])
def delete_portfolio(Id):
  portfolio = Portfolio.query.filter_by(Id=Id).first()
  db.session.delete(portfolio)
  db.session.commit()
  return jsonify("portfolio deleted")

########################################################################
# DB SETUP ROUTES
########################################################################

# @app.route('/database/resetdb')
# def reset_db():
#     db.drop_all()
#     db.create_all()
#     return jsonify("db reset")

# @app.route('/database/seeddb')
# def seed_db():
#     try:
#       share_data = [Share(Ticker=share,Name=source_shares[share]) for share in source_shares]
#       db.session.add_all(share_data)
#       db.session.commit()
#     except Exception as e:
#       db.session.rollback()
#       return jsonify(e)
#     return jsonify("db seeded")

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
   
