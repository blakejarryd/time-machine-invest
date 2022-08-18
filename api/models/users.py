from ..db import db

class User(db.Model):
  __tablename__ = 'User'
  Id = db.Column(db.Integer, primary_key=True)
  Username = db.Column(db.String(80), nullable=False, unique=True)
  Password = db.Column(db.String(80), nullable=False)