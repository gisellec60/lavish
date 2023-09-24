#!/usr/bin/env python3

from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_marshmallow import Marshmallow 
from config import app, db, api
from models import Parent, Dancer, Event, Practice, Emergency, User
from datetime import date, datetime


ma = Marshmallow(app)

#-------------------------------------------Run Before App --------------------------------------------
def clean_parents():
    parent_list=[]
    parents = Parent.query.all()
    dancers = Dancer.query.all()

    for parent in parents:
        for dancer in dancers:
            if parent.id == dancer.parent_id:
                parent_list.append(parent.id)
    
    for parent in parents:
        if parent.id not in parent_list:            
            db.session.delete(parent)
    db.session.commit()

def clean_emergency():
    emergency_list=[]
    emergencies = Emergency.query.all()
    dancers = Dancer.query.all()

    for emergency in emergencies:
        for dancer in dancers:
            if emergency.id == dancer.emergency_id:
                emergency_list.append(emergency.id)
    
    for emergency in emergencies:
        if emergency.id not in emergency_list:            
            db.session.delete(emergency)
    db.session.commit()

def keep_age_current():
    today=date.today()
    dancers = Dancer.query.all()
    for dancer in dancers:
        dancer.age = today.year - dancer.dob.year - ((today.month, today.day) <
        (dancer.dob.month, dancer.dob.day))
        db.session.commit()

def seed_userid():
    dancers = Dancer.query.all()
    parents = Parent.query.all()
    users = User.query.all()

    for dancer in dancers:
        for user in users:
            if dancer.username == user.username:
                userid=dancer.id
        
    for parent in parents:
        for user in users:
            if parent.username == user.username:
                userid=parent.id
   
#-------------------------------------------Marshmallow----------------------------------------------45122222222222222222222222222222222222222222222222222222222222222222222
#List all Parent Info 
class ParentListSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Parent 

    id = ma.auto_field()
    first  = ma.auto_field()
    last  = ma.auto_field()
    email = ma.auto_field()
    phone = ma.auto_field()
    address = ma.auto_field()
    username = ma.auto_field()
    is_balance = ma.auto_field()
    balance = ma.auto_field()

singular_parentlist_schema = ParentListSchema()
list_parentlist_schema = ParentListSchema(many=True)
    
class EventsSchema(ma.SQLAlchemySchema):
        class Meta:
            model = Event 

        id = ma.auto_field()
        date = ma.auto_field()
        event_time = ma.auto_field()
        arrival_time = ma.auto_field()
        venue = ma.auto_field()
        address = ma.auto_field()

singular_event_schema = EventsSchema()
list_event_schema = EventsSchema(many=True)

class PracticeSchema(ma.SQLAlchemySchema):
        class Meta:
            model = Practice 

        id = ma.auto_field()
        date = ma.auto_field()
        practice_time = ma.auto_field()
        arrival_time = ma.auto_field()
        venue = ma.auto_field()
        address = ma.auto_field()

singular_practice_schema = PracticeSchema()
list_practice_schema = PracticeSchema(many=True)

class UserSchema(ma.SQLAlchemySchema):
        class Meta:
            model = User 

        id = ma.auto_field()
        name = ma.auto_field()
        username = ma.auto_field()

singular_user_schema = UserSchema()
list_users_schema = UserSchema(many=True)

class EmergencySchema(ma.SQLAlchemySchema):
        class Meta:
            model = Emergency 

        id = ma.auto_field()
        name = ma.auto_field()
        phone = ma.auto_field()
        email = ma.auto_field()

singular_emergency_schema = EmergencySchema()
list_emergency_schema = EmergencySchema(many=True)


class ParentSchema(ma.SQLAlchemySchema):
        class Meta:
            model = Parent 

        id = ma.auto_field()
        first  = ma.auto_field()
        last  = ma.auto_field()
        email = ma.auto_field()
        phone = ma.auto_field()
      
singular_parent_schema = ParentSchema()
list_parents_schema = ParentSchema(many=True)

class DancerSchema(ma.SQLAlchemySchema):

    class Meta:
        model = Dancer 

    #if you want to change a field:
    #first = ma.auto_field(data_key="firstname")
   
    first  = ma.auto_field()
    last  = ma.auto_field()
    username = ma.auto_field()
    email = ma.auto_field()
    phone = ma.auto_field()
    gender = ma.auto_field()
    dob = ma.auto_field()
    age = ma.auto_field()
    bio = ma.auto_field()
    image = ma.auto_field()
    parent = ma.Nested(singular_parent_schema,data_key="Parent")
    emergency = ma.Nested(singular_emergency_schema,data_key="Emergency")

singular_dancer_schema = DancerSchema()  
list_dancers_schema = DancerSchema(many=True)   

#-----------------------------------------End of Marshmallow-------------------------------------------
@app.route("/login", methods = ["Post"])
def login():

    #User Table is for user verification
    
    data =request.get_json()
    user = User.query.filter_by(User.username==data['username']).first()
    if user:
        if user.authenticate(data['password']):
            session["user_id"] = user.id
            return user
        else:
           return {"errors": ["Username or Password incorrect"]}, 401
    else:
        return {"errors": ["Username or Password incorrect"]},401    
#--------------------------------------Custom Routes ------------------------------

class Signup(Resource):
    def post(self):

        #Get input for dancer, Parent, emergency contact
        data = request.get_json()

        birthdate = datetime.strptime(data['dob'],'%Y-%m-%d').date()
        
        dancer = Dancer(
            first = data['first'],
            last = data['last'],
            email = data['email'],
            phone = data['phone'],
            gender = data['gender'],
            age = data["age"],
            dob = birthdate,
            bio = data['bio'],
            image = data['image']
        )
        #set username = email
        dancer.username = dancer.email
        db.session.add(dancer)

        parent = Parent(
            first = data['pfirst'],
            last = data['plast'],
            address = data['padd'],
            email = data['pemail'],
            phone = data['pphone'],
            is_balance = False,
            balance = 0,
        )
        #set username = email
        parent.username = parent.email
        db.session.add(parent)

        #add emergency contact
        emergency = Emergency(
            name = data['ename'],
            email = data['eemail'],
            phone = data['ephone'],
        )
        db.session.add(emergency)
      
        #add dancer and parent to user table for validation when logging in
        users=[]
        user = User(
            name = f"{dancer.first} {dancer.last}",
            username = dancer.username,
            isparent = False,
            isadmin = False
        )   
        user.password_hash = user.username + 'password'
        users.append(user)

        #add parent to user table
        user = User(
            name = f"{parent.first} {parent.last}",
            username = parent.username,
            isparent = True,
            isadmin = False
        )   
        user.password_hash = user.username + 'password'
        users.append(user)
        db.session.add_all(users)

        #commit the parent, dancer, emergency, user tables
        try:
            db.session.commit()
        except IntegrityError as error:
            for error in error.orig.args:
                if "UNIQUE" in error:
                    failed_item=error[24:]
                    return ([{"Message" : f"{failed_item} already taken"}],422)
                elif "CHECK" in error:
                    return ([{"Message" : "Bio needs to be at least 50 chars"}],422)
        

        #link Parent and Emergency Contact to Dancer through foreignKey
        newdancer = Dancer.query.filter_by(username=dancer.username).first()  
        newparent = Parent.query.filter_by(username=parent.username).first()
        newemergency = Emergency.query.filter_by(name=emergency.name).first()    
        
        newdancer.parent_id = newparent.id
        newdancer.emergency_id = newemergency.id
        db.session.commit()
        
        response = make_response([singular_dancer_schema.dump(dancer)],201)
        return response
    
class DeleteDancer(Resource):
    def delete(self,id):

       # When deleting a dancer we also delete the dancer from the following:
       # practice and events association tables
       # remove dancer from the user table.
       # delete the parent if dancer is the only child in the dance club
       # delete the emergency contact this is the only dancer for that contact
        
       dancer = Dancer.query.filter_by(Dancer.id==id).first()
       users= User.query.all()
       parents = Parent.query.all()
       emergencies = Emergency.query.all()
       
       if dancer:
            
            #remove dancer from event_dancer association table
            if len(dancer.events) > 0:
               for event in dancer.events:
                   dancer.events.remove(event)

            #remove dancer from practice_dancer association table
            if len(dancer.practice > 0):    
               for practice in dancer.practices:
                   dancer.events.remove(practice)

            #remove dancer from user table    
            for user in users:
                if userid == dancer.id:
                    db.session.delete(user)

            #remove parent if dancer is only child
            for parent in parents:
                if dancer.parent_id == parent.id:
                    if len(parent.dancers) == 1: 
                        db.session.delete(parent)

            #remove emergency contact if dancer is the only one using this contact                   
            for emergency in emergencies:
                if dancer.emergency_id == emergency.id:
                    if len(emergency.dancers) == 1: 
                        db.session.delete(emergency)

            #Finally, delete dancer and commit change
            db.session.delete(dancer)
            db.session.commit() 
            return ([{"Message" : "dancer removed"}],204) 
       else:
           return {"Message":["Users Not Found"]}, 404  
 
class AddDancer(Resource):
    def post(self):

        #Get input dancer
        data = request.get_json()

        birthdate = datetime.strptime(data['dob'],'%Y-%m-%d').date()
        
        dancer = Dancer(
            first = data['first'],
            last = data['last'],
            email = data['email'],
            phone = data['phone'],
            gender = data['gender'],
            age = data["age"],
            dob = birthdate,
            bio = data['bio'],
            image = data['image'],
            parent_id = data['parent'],
            emergency_id = data['emergency']
        )
        dancer.username = dancer.email

        user = User(
            name = f"{dancer.first} {dancer.last}",
            username = dancer.username,
            isparent = False,
            isadmin = False
        )   
        user.password_hash = user.username + 'password'
        
        #Make sure email is unique.
        try:
            db.session.add(dancer)
            db.session.add(user)
            db.session.commit()
        except IntegrityError as error:
            for error in error.orig.args:
                print ("this is an error:", str(error) )
                if "UNIQUE" in error:
                    return ({"Message" : "Email already taken"},422)
                elif "CHECK" in error:
                    return ([{"Message" : "Bio needs to be at least 50 chars"}],422)

        response = make_response([singular_dancer_schema.dump(dancer)], 201)
        return response

class Users(Resource):
    def get(self):

        users = list_users_schema.dump(User.query.all()) 

        if users:
            response = make_response (users,200)
            return response
        return {"Message":["Users Not Found"]}, 404  

class Parents(Resource):
    def get(self):

        parents = list_parentlist_schema.dump(Parent.query.all())
               
        if parents:
            response = make_response (parents,200)
            return response
        return {"Message":["Dancers Not Found"]}, 404  
    
class Dancers(Resource):
    def get(self):

        dancers = list_dancers_schema.dump(Dancer.query.all())

        if dancers:
            response = make_response (dancers, 200)
            return response
        
        return {"Message":["Dancers Not Found"]}, 404         

class Events(Resource):
    def get(self):

        events = list_event_schema.dump(Event.query.all())

        if events:
            response = make_response(events, 201)
            return response
        return {"Message": ["No Events Scheduled"]}, 404

class Practices(Resource):
    def get(self):

        practice = list_practice_schema.dump(Practice.query.all())

        if practice:
            response = make_response (practice, 201) 
            return response
        return {"Message": ["No Practice Scheduled"]}, 404

class DancerByID(Resource):
   
   def get(self,id):
       action = request.args.get('action')
       
       dancer = Dancer.query.filter_by(id=id).first() 
       if dancer: 
            if action == "none":
                response = make_response(singular_dancer_schema.dump(dancer), 201)
            elif action == "events":
                response = make_response(list_event_schema.dump(dancer.events), 201)
            elif action == "practices":
                response = make_response(list_practice_schema.dump(dancer.practices), 201)    
            elif action == "noevents":
                not_listed=[]
                events = Event.query.all()
                for event in events:
                    if event.id not in dancer.events:
                        not_listed.append(event)
                response = make_response(list_event_schema.dump(not_listed), 201)
            elif action == "nopractice":
                not_listed=[]
                practices = Practice.query.all()
                for practice in practices:
                   if practice.id not in dancer.practices:
                        not_listed.append(practice)
                response = make_response(list_practice_schema.dump(not_listed), 201)
       else:
            response = make_response({"Message":["Invalid Dancer"]}, 404)
       return response
   
class ParentByID(Resource):
   
   def get(self,id):
       
       parent = singular_parentlist_schema.dump(Parent.query.filter_by(id=id).first()) 
       if parent: 
           response = make_response(parent, 201)
           return response
       return {"Message":["Invalid Parent"] }, 404   
   

class EventByID(Resource):
    def get(self,id):
       
        action = request.args.get('action')

        event = Event.query.filter_by(id=id).first() 

        if event:
            if action == "none":
                print("this is none")
                response = make_response(singular_event_schema.dump(event), 201)    
            elif action == "dancers": 
                 print("this is dancers") 
                 response = make_response(list_dancers_schema.dump(event.dancers), 201)
            elif action == "nodancers":
                print("this is else") 
                not_listed=[]
                dancers = Dancer.query.all()
                for dancer in dancers:
                    if dancer.id not in event.dancers:
                         not_listed.append(dancer)
                response = make_response(list_dancers_schema.dump(not_listed), 201)          
        else:
            response = make_response({"Message": ["Invalid Event"]}, 404)
        return response

api.add_resource(Dancers, '/dancers', endpoint='dancers')
api.add_resource(DancerByID,'/dancers/<int:id>', endpoint='dancer/id')
api.add_resource(AddDancer,'/dancers/add', endpoint='dancer/add')
api.add_resource(DeleteDancer,'/dancers/delete', endpoint='dancer/delete')

api.add_resource(Parents, '/parents', endpoint='parents')
api.add_resource(ParentByID,'/parents/<int:id>', endpoint='parent/id')

api.add_resource(Events, '/events', endpoint='events')
api.add_resource(EventByID, '/events/<int:id>', endpoint='event/id')

api.add_resource(Practices, '/practices', endpoint='practices')

api.add_resource(Users, '/users', endpoint='users')
api.add_resource(Signup, '/dancer/signup', endpoint='dancer/signup')

if __name__ == '__main__':
    with app.app_context():
        keep_age_current()
        clean_parents()
        clean_emergency()
    app.run(port=5555,debug=True)