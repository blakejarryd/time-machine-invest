from ..db import db

class Share(db.Model):
  __tablename__ = 'Share'
  Id = db.Column(db.Integer, primary_key=True)
  Ticker = db.Column(db.String(10), nullable=False, unique=True)
  Name = db.Column(db.String(150), nullable=False, unique=True)

class SharePrice(db.Model):
  __tablename__ = 'SharePrice'
  Id = db.Column(db.Integer, primary_key=True)
  ShareId = db.Column(db.Integer, db.ForeignKey('Share.Id'))
  Date = db.Column(db.DateTime)
  Price = db.Column(db.Float(precision=2))

class ShareInfo(db.Model):
  __tablename__ = 'ShareInfo'
  Id = db.Column(db.Integer, primary_key=True)
  ShareId = db.Column(db.Integer, db.ForeignKey('Share.Id'))
  Sector = db.Column(db.String(80))
  Employees = db.Column(db.Integer)