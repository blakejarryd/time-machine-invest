from config.ma import ma
from models.share import Share, SharePrice

class ShareSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Share
    load_instance = True
    include_relationships = True

class SharePriceSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = SharePrice
    load_instance = True
    include_fk= True

share_schema = ShareSchema(many=True)
share_price_schema = SharePriceSchema(many=True)
