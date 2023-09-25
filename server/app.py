#!/usr/bin/env python3

from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_marshmallow import Marshmallow 
from config import app, db, api
from models import Parent, Dancer, Event, Practice, Emergency, User
from datetime import date, datetime
import time

ma = Marshmallow(app)

#------------------------------------------- Run Before App --------------------------------------------
# Since faker is not perfect sometimes we need to augment it. For me to clean up the data seeded
# by faker I need to do some updates that cannot happen without an id. We don't have access to 
# id's until seed.py is ran so I added the updates here.  

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

# I calculate age every time app runs to keep age current. 
def keep_age_current():
    today=date.today()
    dancers = Dancer.query.all()
    for dancer in dancers:
        dancer.age = today.year - dancer.dob.year - ((today.month, today.day) <
        (dancer.dob.month, dancer.dob.day))
    db.session.commit()    
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
    id = ma.auto_field()
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
       # Only parent or Admin is authorized to delete a dancer 
       # When deleting a dancer we also delete the dancer from the following:
       # remove dancer from the user table.
       # delete the parent if dancer is the only child in the dance club
       # delete the emergency contact this is the only dancer for that contact
        
       dancer = Dancer.query.filter_by(id=id).first()
       users= User.query.all()
       parents = Parent.query.all()
       emergencies = Emergency.query.all()
       session['admin'] = True

       if dancer:
            if session.get('admin') or session.get('user_id') == dancer.parent_id:
                #remove dancer from user table    
                for user in users:
                    if user.username == dancer.username:
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
                return {},204 
            else:
                return [{"Message":"User Not Authorized"}], 401  
       else:
            return [{"Message":"User Not Found"}], 404  

class Dancers(Resource):
    def get(self):
        
        #Only admin can list all the dancer information:
        session['isadmin'] = True
        dancers = list_dancers_schema.dump(Dancer.query.all())

        if dancers:
            if session.get("isadmin"):
                response = make_response (dancers, 200)
                return response
            else:
                return  [{"Message":"User Not Authorized"}], 401 
        return [{"Message":"Dancers Not Found"}], 404       

class AddDancer(Resource):

    def post(self):
        #Only Parent or admin can add a dancer. 
        #Parent can only add their child

        session['admin'] = True

        if session.get('isadmin') or session.get("isparent"):
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
        else:
            return  [{"Message":"User Not Authorized"}], 401

class ModifyDancer(Resource):
    def patch(self,id):
        # Only admin, parent or dancer can modify dancer

        dancer = Dancer.query.filter_by(id=id).first() 
        session['user_id'] = dancer.id
            
        if dancer:
            if session.get('user_id') == dancer.id or session.get('isadmin') or session.get('user_id') == dancer.parent_id:
                data = request.json
                for key,value in data.items():
                    if key == "first":
                        dancer.first=value
                    elif key == "last":
                        dancer.last=value
                    elif key == "email":
                        dancer.email = value
                        dancer.username = value
                    elif key == "phone":
                        dancer.phone = value
                    elif key == "gender":
                        dancer.gender = value
                    elif key == "dob":
                        dancer.dob = value
                    elif key == "bio":
                        dancer.bio == value
                    elif key == "image":
                        dancer.image = value
                    db.session.commit()    
            response = make_response([singular_dancer_schema.dump(dancer)], 202)       
        else:
            return [{"Message":"User Not Found"}], 404  
        return response

class DancerByID(Resource):
   
   def get(self,id):
       #Only dancer, Parent, or admin
       session["admin"] = True

       if session.get("user_id") == dancer.id or session.get("userid") == dancer.parent_id or session.get('isadmin'):
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
                    response = make_response([{"Message":"Invalid Dancer"}], 404)
            return response
       else:
           return [{"Message":"User Not Authorized"}], 401  
 
class Parents(Resource):
    def get(self):
        # Only admin can list all parent information

        session["isadmin"] = True
        parents = list_parentlist_schema.dump(Parent.query.all())
               
        if parents:
            if session.get("isadmin"):
                response = make_response (parents,200)
                return response
            else:
                return [{"Message":"User Not Authorized"}], 401
        return [{"Message":"Dancers Not Found"}], 404  

class ParentByID(Resource):
   def get(self,id):
       #Only Parent and Admin has access
       session["isadmin"] = True

       if session.get("isadmin") or session.get("user_id") == parent.id:
            parent = singular_parentlist_schema.dump(Parent.query.filter_by(id=id).first()) 
            if parent: 
                response = make_response(parent, 201)
                return response
            return [{"Message":"Invalid Parent" }], 404  
       else:
           return [{"Message":"User Not authorized" }], 401 

class ModifyParent(Resource):
    def patch(self,id):
        #Only parent or admin is authorized

        parent = Parent.query.filter_by(id=id).first()    
        # session['user_id'] = parent.id  
        
        if parent:
            if session.get('user_id') == parent.id or session.get('admin'):
                data = request.json
                for key,value in data.items():
                    if key == "first":
                        parent.first=value
                    elif key == "last":
                        parent.last=value
                    elif key == "email":
                        parent.email = value
                        parent.username = value
                    elif key == "phone":
                        parent.phone = value
                    elif key == "address":
                        parent.address = value
                    db.session.commit()    
                response = make_response([singular_dancer_schema.dump(parent)], 202) 
            else:
                return  [{"Message":"User Not Authorized"}], 401            
        else:
            return [{"Message":"User Not Found"}], 404  
        return response

class Events(Resource):
    def get(self):

        events = list_event_schema.dump(Event.query.all())

        if events:
            response = make_response(events, 201)
            return response
        return [{"Message": "No Events Scheduled"}], 404

class AddEvent(Resource):
    def post(self):
        #Only admin can add an event
        session["isadmin"] = True

        if session.get("isadmin"):
            data = request.get_json()
            date = datetime.strptime(data['date'],'%Y-%m-%d').date()

            event = Event(
                date = date,
                event_time = data["event_time"],
                arrival_time = data["arrival_time"],
                venue = data["venue"],
                address = data["address"]
            )
            db.session.add(event)
            db.session.commit()

            response = make_response(singular_event_schema.dump(event), 201)
            return response
        else:
            return  [{"Message":"User Not Authorized"}], 401 
    
class ModifyEvent(Resource):
    def patch(self,id):

        session["isadmin"] = True
        if session.get("isadmin"):

            event = Event.query.filter_by(id=id).first() 

            if event:
                data = request.json
                for key,value in data.items():
                    if key == "event_time":
                        event.event_time=value
                    elif key == "date":
                        event.date = datetime.strptime(value,'%Y-%m-%d').date()   
                    elif key == "arrival_time":
                        event.arrival_time=value
                    elif key == "venue":
                        event.venue = value
                    elif key == "address":    
                        event.address = value
                db.session.commit()
                response = make_response(singular_event_schema.dump(event), 202)    
            else:
                return [{"Message": "No Events Scheduled"}], 404
            return response
        else:
            return  [{"Message":"User Not Authorized"}], 401

class DeleteEvent(Resource):
    def delete(self,id):

        #only admin can delete an event
        session["isadmin"] = True

        if session.get("isadmin"):
            event = Event.query.filter_by(id=id).first()
            
            if event:
                db.session.delete(event)
                db.session.commit()
                return {}, 204
            else:
                return [{"Message":"Event Not Found"}], 404   
        else:
            return  [{"Message":"User Not Authorized"}], 401     

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
                    if dancer not in event.dancers:
                         not_listed.append(dancer)
                response = make_response(list_dancers_schema.dump(not_listed), 201)          
        else:
            response = make_response([{"Message": "Invalid Event"}], 404)
        return response

class Practices(Resource):
    def get(self):

        practice = list_practice_schema.dump(Practice.query.all())

        if practice:
            response = make_response (practice, 201) 
            return response
        return [{"Message": "No Practice Scheduled"}], 404

class PracticeByID(Resource):
    def get(self,id):
        session["isadmin"] = True
        if session.get("isadmin"):
            action = request.args.get('action')

            practice = Practice.query.filter_by(id=id).first() 

            if practice:
                if action == "none":
                    response = make_response(singular_practice_schema.dump(practice), 201)    
                elif action == "dancers": 
                    response = make_response(list_dancers_schema.dump(practice.dancers), 201)
                elif action == "nodancers":
                    not_listed=[]
                    dancers = Dancer.query.all()
                    for dancer in dancers:
                        if dancer not in practice.dancers:
                            not_listed.append(dancer)
                    response = make_response(list_dancers_schema.dump(not_listed), 201)          
            else:
                response = make_response([{"Message": "Invalid Event"}], 404)
            return response
        else:
            return [{"Message": "User not authorized"}], 401

class AddPractice(Resource):
    def post(self):
        # Only admin can add to the practice schedule

        session["isadmin"] = True
        if session.get("isadmin"):
            data = request.get_json()
            date = datetime.strptime(data['date'],'%Y-%m-%d').date()

            practice = Practice(
                date = date,
                practice_time = data["practice_time"],
                arrival_time = data["arrival_time"],
                venue = data["venue"],
                address = data["address"]
            )
            db.session.add(practice)
            db.session.commit()

            response = make_response(singular_event_schema.dump(practice), 201)
            return response
        else:
            return [{"Message": "User not authorized"}], 401
    
class ModifyPractice(Resource):
    def patch(self,id):
        #only Admin can modify practice schedule

        session["isadmin"] = True
        if session.get("isadmin"):
            practice = Practice.query.filter_by(id=id).first() 

            if practice:
                data = request.json
                for key,value in data.items():
                    if key == "practice_time":
                        practice.practice_time=value
                    elif key == "date":
                        print("thise is value", value)
                        practice.date = datetime.strptime(value,'%Y-%m-%d').date()   
                    elif key == "arrival_time":
                        practice.arrival_time=value
                    elif key == "venue":
                        practice.venue = value
                    elif key == "address":    
                        practice.address = value
                db.session.commit()
                response = make_response(singular_event_schema.dump(practice), 202)    
            else:
                return [{"Message": "No Events Scheduled"}], 404
            return response
        else:
            return [{"Message": "User not authorized"}], 401

class DeletePractice(Resource):
    def delete(self,id):
        #Only admin can delete practice from schedule

        session["isadmin"] = True
        if session.get("isadmin"):
            practice = Practice.query.filter_by(id=id).first()
            
            if practice:
                db.session.delete(practice)
                db.session.commit()
                return {}, 204
            else:
                return [{"Message":"Event Not Found"}], 404   
        else:
            return [{"Message":"User not authorized"}]    

class Users(Resource):
    def get(self):

        #Only admin has access to list of user
        session["isadmin"] = True
        users = list_users_schema.dump(User.query.all()) 
        
        if session.get('isadmin'):
            if users:
                if session.get("isadmin"):
                    response = make_response (users,200)
                    return response
                else:
                    return [{"Message":"User Not Authorized"}], 401
            return [{"Message":"Users Not Found"}], 404  
        else:
            return [{"message": "User not authorized"}], 401
    




api.add_resource(Dancers, '/dancers', endpoint='dancers')
api.add_resource(DancerByID,'/dancers/<int:id>', endpoint='dancer/id')
api.add_resource(AddDancer,'/dancers/add', endpoint='dancer/add')
api.add_resource(DeleteDancer,'/dancers/delete/<int:id>', endpoint='dancer/delete/id')
api.add_resource(ModifyDancer,'/dancers/modify/<int:id>', endpoint='dancer/modify/id')

api.add_resource(Parents, '/parents', endpoint='parents')
api.add_resource(ParentByID,'/parents/<int:id>', endpoint='parent/id')
api.add_resource(ModifyParent,'/parents/modify/<int:id>', endpoint='parent/modify/id')

api.add_resource(Events, '/events', endpoint='events')
api.add_resource(EventByID, '/events/<int:id>', endpoint='event/id')
api.add_resource(AddEvent, '/events/add', endpoint='event/add')
api.add_resource(DeleteEvent, '/events/delete/<int:id>', endpoint='event/delete/id')
api.add_resource(ModifyEvent, '/events/modify/<int:id>', endpoint='event/modify/id')

api.add_resource(Practices, '/practices', endpoint='practices')
api.add_resource(PracticeByID, '/practices/<int:id>', endpoint='practice/id')
api.add_resource(AddPractice, '/practices/add', endpoint='practice/add')
api.add_resource(DeletePractice, '/practices/delete/<int:id>', endpoint='practice/delete/id')
api.add_resource(ModifyPractice, '/practices/modify/<int:id>', endpoint='practice/modify/id')

api.add_resource(Users, '/users', endpoint='users')
api.add_resource(Signup, '/dancer/signup', endpoint='dancer/signup')

if __name__ == '__main__':
    with app.app_context():
        clean_parents()
        clean_emergency()
        keep_age_current()
    app.run(port=5555,debug=True)