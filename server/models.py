from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

event_dancer = db.Table (
    'event_dancer',
    db.Column('event_id', db.Integer,  db.ForeignKey('events.id')),
    db.Column('dancer_id', db.Integer,  db.ForeignKey('dancers.id')),
)

practice_dancer = db.Table (
    'practice_dancer',
    db.Column('practice_id', db.Integer,  db.ForeignKey('practices.id')),
    db.Column('dancer_id', db.Integer, db.ForeignKey('dancers.id')),)

class Dancer(db.Model):
    __tablename__ = "dancers"

    __table_args__ = (
        db.CheckConstraint('length(bio) >= 50'),
    )

    id = db.Column(db.Integer, primary_key=True)
    first  = db.Column(db.String, nullable=False)
    last  = db.Column(db.String, nullable=False)
    email = db.Column(db.String,nullable=False, unique=True)
    phone = db.Column(db.String, nullable=False)
    gender = db.Column(db.String, nullable=False)
    dob = db.Column(db.Date, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    bio = db.Column(db.String)
    image = db.Column(db.String)
    username = db.Column(db.String, nullable=False )
    parent_id = db.Column(db.Integer, db.ForeignKey('parents.id'))
    emergency_id = db.Column(db.Integer, db.ForeignKey('emergencies.id'))

    events = db.relationship('Event', secondary='event_dancer',
                          back_populates='dancers')
    
    practices = db.relationship('Practice', secondary='practice_dancer',
                          back_populates='dancers')
    
    def __repr__(self):
        return f'Dancer: {self.id}, ' + \
               f'Image: {self.image}, ' + \
               f'FName: {self.first}, ' + \
               f'Lname: {self.last}, ' + \
               f'Email: {self.email},' + \
               f'Username: {self.username}, ' + \
               f'Gender: {self.gender}, ' + \
               f'Phone: {self.phone}, ' + \
               f'DOB : {self.dob}, ' + \
               f'Age: {self.age},'  + \
               f'Bio: {self.bio},' + \
               f'Parent: {self.parent_id},'+ \
               f'Emergency: {self.emergency_id}'
    
class Parent (db.Model):
    __tablename__ = "parents"

    id = db.Column(db.Integer, primary_key=True)
    first = db.Column(db.String, nullable=False)
    last  = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    email = db.Column(db.String,nullable=False, unique=True)
    phone = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    is_balance = db.Column(db.Boolean, nullable=False)
    balance = db.Column(db.Integer)
    
    dancers = db.relationship('Dancer', backref=db.backref('parent'))
    
    def __repr__(self):
        return f'Parent: {self.id}, ' + \
               f'FName: {self.first}, ' + \
               f'Lname: {self.last}, ' + \
               f'Email: {self.email},' + \
               f'Username: {self.username}, ' + \
               f'Phone: {self.phone}, ' + \
               f'Address: {self.address},' + \
               f'isBalance: {self.is_balance},' + \
               f'Balance: {self.balance}'

class Event (db.Model):
    __tablename__ = "events"   
    
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)
    event_time = db.Column(db.String)
    arrival_time = db.Column(db.String)
    venue = db.Column(db.String)
    address = db.Column(db.String)

    dancers = db.relationship('Dancer', secondary='event_dancer',
                          back_populates='events')
    
    def __repr__(self):
        return f'Event: {self.id} Date:{self.date},' + \
               f'Event_Time: {self.event_time} Arrival:{self.arrival_time},' + \
               f' Venue:{self.venue} Address: {self.address}'

class Practice(db.Model):
    __tablename__ = "practices"  

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)
    practice_time = db.Column(db.String)
    arrival_time = db.Column(db.String)
    venue = db.Column(db.String)
    address = db.Column(db.String)

    dancers = db.relationship('Dancer', secondary='practice_dancer',
                          back_populates='practices')

    def __repr__(self):
        return f'Practice: {self.id} Date:{self.date},' + \
               f'Practice: {self.practice_time} Arrival:{self.arrival_time},' + \
               f' Venue:{self.venue} Address: {self.address}'

class Emergency(db.Model):
    __tablename__ = "emergencies"   
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=False)
    email = db.Column(db.String)

    dancers = db.relationship('Dancer', backref=db.backref('emergency'))

    def __repr__(self):
        return f'Emergency: {self.id} Name:{self.name},' + \
               f'Phone: {self.phone} Email:{self.email}' 
    
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    isparent = db.Column(db.Boolean, nullable=False)
    isadmin = db.Column(db.Boolean, nullable=False)

    _password_hash = db.Column(db.String, nullable=False)

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
            
    @password_hash.setter
    def password_hash(self, password):
        
        password_hash = bcrypt.generate_password_hash( password.encode('utf-8'))
        
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'Id: {self.id} User:{self.username} '
