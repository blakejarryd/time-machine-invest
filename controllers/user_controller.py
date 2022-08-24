import yfinance as yf
from flask import session, jsonify
from ..db import db
from ..models.user import User
from ..schemas.user_schemas import user_schema
from werkzeug.security import generate_password_hash, check_password_hash

def create_user(request):
  username=request['username']
  password=request['password']
  password_hash=generate_password_hash(password)
  new_user = User(Username=username, Password=password_hash)
  db.session.add(new_user)
  db.session.commit()
  user = user_schema.dump(new_user)
  user.pop('Password')
  return jsonify(success=True, user=user)

def login_user(request):
  username=request['username']
  password=request['password']
  login_user = User.query.filter_by(Username=username).first()
  user = user_schema.dump(login_user)
  if user is None:
    return jsonify(success=False, msg='Username or password is incorrect')
  password_matches = check_password_hash(user['Password'], password)
  if not password_matches:
    return jsonify(success=False, msg='Username or password is incorrect')
  user.pop('Password')
  try:
    session['user'] = user
  except Exception as e:
    print(e)
  return jsonify(success=True, user=user)

def logout_user():
  session.pop('user', None)
  return jsonify(success=True)

def auth_check():
  user = session.get('user', None)
  if user:
      return jsonify(success=True, user=user)
  else:
      return jsonify(success=False, msg='User is not logged in')