from unicodedata import name
import click
from flask.cli import with_appcontext
from .seed.share_seed import shares

from .db import db
from .models.share import Share, SharePrice


@click.command(name='create_db')
@with_appcontext
def create_db():
    db.create_all()

@click.command(name='drop_db')
@with_appcontext
def drop_db():
    db.drop_all()

@click.command(name='reset_db')
@with_appcontext
def reset_db():
    db.drop_all()
    db.create_all()

@click.command(name='seed_db')
@with_appcontext
def seed_db():
    share_data = [Share(Ticker=share,Name=shares[share]) for share in shares]
    db.session.add_all(share_data)
    db.session.commit()

commands = [
    create_db,
    drop_db,
    reset_db,
    seed_db
]