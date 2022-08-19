import yfinance as yf
from ..db import db
from ..models.user import User

def create_user(request):
  new_user = User(Username=request['Username'], Password=request['Password'])
  db.session.add(new_user)
  db.session.commit()
