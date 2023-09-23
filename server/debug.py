#!/usr/bin/env python3
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Parent, Dancer, Event, Practice, Emergency, event_dancer, practice_dancer
import ipdb;
from config import app, db, api

engine = create_engine('sqlite:///divas.db')
Session = sessionmaker(bind=engine)
session = Session()


if __name__ == '__main__':
    ipdb.set_trace()