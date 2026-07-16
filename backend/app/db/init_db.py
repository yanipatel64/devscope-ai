from app.db.database import Base, engine

# Import all models here
from app.models.user import User


def init_db():
    Base.metadata.create_all(bind=engine)