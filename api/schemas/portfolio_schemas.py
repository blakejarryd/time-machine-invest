from ..ma import ma
from marshmallow import Schema, fields


from ..models.portfolio import Portfolio, PortfolioShares
from .share_shemas import share_schema

class PortfolioSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Portfolio
    load_instance = True
    include_relationships = True
    include_fk= True

class PortfolioSharesSchema(ma.SQLAlchemyAutoSchema):
  Share = fields.Nested(share_schema, many=True)
  class Meta:
    model = PortfolioShares
    fields = ('AquiredDate', 'Cost', 'Id', 'PortfolioId', 'Qty', 'ShareId', 'Ticker')
    load_instance = True
    include_fk= True
  
 

portfolio_schema = PortfolioSchema(many=True)
portfolio_shares_schema = PortfolioSharesSchema(many=True)
