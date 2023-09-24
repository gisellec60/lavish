from random import choice as rc
import random
from faker import Faker
from datetime import date
from app import app
from models import db, event_dancer, practice_dancer, Dancer, Parent, Event, Practice, Emergency, User

fake = Faker('en_US')

with app.app_context():

    # #Delete existing tables
    print('Deleting existing association tables:...\n')
    print("event_dancer...\n")
    db.session.execute(event_dancer.delete()) 
    print("practice_dancer...\n")
    db.session.execute(practice_dancer.delete())

    print('Deleting existing Dancer table ...\n')
    Dancer.query.delete()
    print('Deleting existing Parent table ...\n')
    Parent.query.delete()
    print('Deleting existing Emergency table ...\n')
    Emergency.query.delete()
    print('Deleting existing Event table ...\n')
    Event.query.delete()
    print('Deleting existing Practice table ...\n')
    Practice.query.delete()
    print('Deleting existing User table ...\n')
    User.query.delete()

    dancers = []
    sex = ["male","female"]

    for _ in range (1,25):

        dancer = Dancer (
            first = fake.first_name(),
            last =  fake.last_name(),
            username = "",
            email = fake.free_email(),
            phone = fake.phone_number(),
            gender = rc(sex),
            dob = fake.date_of_birth(minimum_age=10, maximum_age=20),
            age = "",
            bio = fake.paragraph(nb_sentences=5),
            image = fake.url(),
            parent_id = random.randint(1,17),
            emergency_id = random.randint(1,17)
        ) 
        dancers.append(dancer)
            
    #set username to email and calculate age using dob
    today=date.today()
    for dancer in dancers:
        dancer.username = dancer.email
        dancer.age = today.year - dancer.dob.year - ((today.month, today.day) <
         (dancer.dob.month, dancer.dob.day))
    
    db.session.add_all(dancers)

    parents = []
    for _ in range(17):

        parent = Parent(
            first = fake.first_name(),
            last  = fake.last_name(),
            address = fake.street_address(),
            email = fake.email(),
            phone = fake.phone_number(),
            username = "",
            is_balance = fake.boolean(chance_of_getting_true=30),
            balance = random.randint(1,100),
        )
        parents.append(parent)

    #set username to email    
    for parent in parents:
        parent.username = parent.email    
    db.session.add_all(parents)    

    #Add the parents and dancers to the user table for login verification
    #When user logs in we don't have to search two seperate tables to validate the user.
    users = []
    for dancer in dancers:
        user = User(
            name = f" {dancer.first} {dancer.last}" ,
            username=dancer.username,
            isparent=False,
            isadmin =False
        )
        user.password_hash = user.username + 'password'
        users.append(user)
    
    for parent in parents:
        user = User(
           name = f" {parent.first} {parent.last}" , 
           username=parent.username,
           isparent=True,
           isadmin=False
        )
        user.password_hash = user.username + 'password'
        users.append(user)
    db.session.add_all(users)   

    emergencies = []
    for _ in range(17):

        emergency = Emergency(
            name = fake.name(),
            email = fake.email(),
            phone = fake.phone_number(),
        )
        emergencies.append(emergency)
    db.session.add_all(emergencies)    

    events = []
    etime = ["10am-5pm","9am-1pm", "10am-4pm", "9am-5pm"]
    atime = ["08:00:00","08:30:00","07:30:00"]
    for _ in range(7):
        event = Event(
            date = fake.date_this_month(after_today=True),
            event_time = rc(etime),
            arrival_time = rc(atime),
            venue = fake.company(),
            address = fake.street_address()
        )
        events.append(event)
    db.session.add_all(events) 

    venue_list = ["Waverly Center","Que Gardens", "Soundview Center"]
    venue_address=["1212 Strawberry Fields Street", "1600 Pensylvania Ave","1300 Mocking Bird Lane"]
    practices = []
    for _ in range(8):
        practice = Practice(
            date = fake.date_this_month(after_today=True),
            practice_time = "6-8pm",
            arrival_time = "5-6pm",
            venue = rc(venue_list),
            address = rc(venue_address)
        )    
        practices.append(practice)
    db.session.add_all(practices) 

    #populating event_dancer association table 
    for event in events:
        j = list(range(1,24))
        for i in range(1,18):
            random.shuffle(j)
            dancers[j.pop()].events.append(event)

    
    #populating practice_dancer association table 
    for practice in practices:
        j = list(range(1,24))
        for i in range(1,18):
            random.shuffle(j)
            dancers[j.pop()].practices.append(practice)

    #if is_balance False set balance to 0
    for parent in parents:
        if not parent.is_balance:
            parent.balance = 0
    
                
    db.session.commit()
    print('Seeding Complete')      