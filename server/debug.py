from faker import Faker
from datetime import datetime, timedelta
from models import db
fake = Faker()

print(datetime(db.func.now))