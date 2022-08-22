from ..ma import ma
from ..models.portfolio import Portfolio, PortfolioShares

class PortfolioSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Portfolio
    load_instance = True
    include_relationships = True
    include_fk= True

class PortfolioSharesSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = PortfolioShares
    load_instance = True
    include_fk= True

portfolio_schema = PortfolioSchema(many=True)
portfolio_shares_schema = PortfolioShares()
