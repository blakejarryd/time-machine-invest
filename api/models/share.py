from ..db import db

class Share(db.Model):
  __tablename__ = 'Share'
  Id = db.Column(db.Integer, primary_key=True)
  Ticker = db.Column(db.String(10), nullable=False, unique=True)
  Name = db.Column(db.String(150), nullable=False, unique=True)
  Sector = db.Column(db.String(80))
  Employees = db.Column(db.Integer)
  Summary = db.Column(db.Text)
  # LogoUrl = db.Column(db.String)
  # DividendYield = db.db.Column(db.Float(precision=4))

class SharePrice(db.Model):
  __tablename__ = 'SharePrice'
  Id = db.Column(db.Integer, primary_key=True)
  ShareId = db.Column(db.Integer, db.ForeignKey('Share.Id'))
  Date = db.Column(db.DateTime)
  Price = db.Column(db.Float(precision=2))

