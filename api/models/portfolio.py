from ..db import db

class Portfolio(db.Model):
  __tablename__ = 'Portfolio'
  Id = db.Column(db.Integer, primary_key=True)
  UserId = db.Column(db.Integer, db.ForeignKey('User.Id'))
  Name = db.Column(db.String(150), nullable=False, unique=True)

class PortfolioShares(db.Model):
  __tablename__ = 'PortfolioShares'
  Id = db.Column(db.Integer, primary_key=True)
  PortfolioId = db.Column(db.Integer, db.ForeignKey('Portfolio.Id'))
  ShareId = db.Column(db.Integer, db.ForeignKey('Share.Id'))
  Qty = db.Column(db.Integer)
  AquiredDate = db.Column(db.DateTime)
  Cost = db.Column(db.Float(precision=2))
  
