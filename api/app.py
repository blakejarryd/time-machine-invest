from flask import Flask, request
from .commands import commands
from .db import db
from .ma import ma
from .models.share import Share, ShareInfo, SharePrice
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
def home():
  shares = Share.query.all()
  return share_schema.dump(shares)

  