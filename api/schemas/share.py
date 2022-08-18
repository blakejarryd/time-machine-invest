from ..ma import ma
from ..models.share import Share, SharePrice, ShareInfo

class ShareSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Share
    load_instance = True
    include_relationships = True

class SharePriceSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = SharePrice
    load_instance = True
    load_only = ("store",)
    include_fk= True

class ShareInfo(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = ShareInfo
    load_instance = True
    load_only = ("store",)
    include_fk= True

share_schema = ShareSchema(many=True)
share_price_schema = SharePriceSchema()
share_info = ShareInfo()