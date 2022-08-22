from ..db import db

class Share(db.Model):
  __tablename__ = 'Share'
  Id = db.Column(db.Integer, primary_key=True)
  Ticker = db.Column(db.String(10), nullable=False, unique=True)
  Name = db.Column(db.String(150), nullable=False, unique=True)
  Sector = db.Column(db.String(80))
  Industry = db.Column(db.String(80))
  Employees = db.Column(db.Integer)
  Summary = db.Column(db.Text)
  Website = db.Column(db.Text)
  LogoUrl = db.Column(db.Text)
  DividendYield = db.Column(db.Numeric(10, 4))
  MarketCap = db.Column(db.BigInteger)


class SharePrice(db.Model):
  __tablename__ = 'SharePrice'
  Id = db.Column(db.Integer, primary_key=True)
  ShareId = db.Column(db.Integer, db.ForeignKey('Share.Id'))
  Date = db.Column(db.DateTime)
  Price = db.Column(db.Numeric(10, 2))
  __table_args__ = (db.UniqueConstraint('ShareId', 'Date', name='_share_date_uc'),)

