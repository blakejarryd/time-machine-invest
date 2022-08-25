from ..config.db import db

class Portfolio(db.Model):
  __tablename__ = 'Portfolio'
  Id = db.Column(db.Integer, primary_key=True)
  UserId = db.Column(db.Integer, db.ForeignKey('User.Id'))
  Name = db.Column(db.String(150), nullable=False, unique=True)
  PortfolioShares = db.relationship(
    'PortfolioShares',
    backref='Portfolio',
    cascade='all, delete'
  )

class PortfolioShares(db.Model):
  __tablename__ = 'PortfolioShares'
  Id = db.Column(db.Integer, primary_key=True)
  PortfolioId = db.Column(db.Integer, db.ForeignKey('Portfolio.Id'))
  ShareId = db.Column(db.Integer, db.ForeignKey('Share.Id'))
  Qty = db.Column(db.Integer)
  AquiredDate = db.Column(db.DateTime)
  Cost = db.Column(db.Numeric(10, 2))
  Ticker = db.relationship('Share')
