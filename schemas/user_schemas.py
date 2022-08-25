from config.ma import ma
from models.user import User

class UserSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = User
    load_instance = True
    include_relationships = True

user_schema = UserSchema()

