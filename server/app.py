#!/usr/bin/env python3

from flask import request, session, make_response,render_template
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_marshmallow import Marshmallow 
from config import app, db, api
from models import Parent, Dancer, Event, Practice, Emergency, User,Password
from datetime import date, datetime

ma = Marshmallow(app)

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")



#------------------------------------------- Run Before App --------------------------------------------
# Since faker is not perfect sometimes we need to augment it. For me to clean up the data seeded
# by faker I need to do some updates that cannot happen without an id. We don't have access to 
# id's until seed.py is ran so I added the updates here.  I will revist this if time permits.

# If parent is not connected to a dancer remove the parent 
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

def clean_dancers():
    dancers = Dancer.query.all()
    for dancer in dancers:
        if (not dancer.parent_id) or not (dancer.emergency_id):
            db.session.delete(dancer)
    db.session.commit()

# I calculate age every time app runs to keep age current. 
def keep_age_current():
    today=date.today()
    dancers = Dancer.query.all()
    for dancer in dancers:
        dancer.age = today.year - dancer.dob.year - ((today.month, today.day) <
        (dancer.dob.month, dancer.dob.day))
    db.session.commit()    
#-------------------------------------------Marshmallow----------------------------------------------

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
        isparent = ma.auto_field()
        isadmin = ma.auto_field()

singular_user_schema = UserSchema()
list_users_schema = UserSchema(many=True)

class AdminSchema(ma.SQLAlchemySchema):
        class Meta:
            model = User 
        isparent = ma.auto_field()
        isadmin = ma.auto_field()

singular_admin_schema = AdminSchema()
list_admins_schema = AdminSchema(many=True)

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

class DancerNames(ma.SQLAlchemySchema):
    class Meta:
        model = Dancer 

    id = ma.auto_field()
    first  = ma.auto_field()
    last  = ma.auto_field()
    email = ma.auto_field()
    phone = ma.auto_field()
    gender = ma.auto_field()
    dob = ma.auto_field()
    age = ma.auto_field()
    bio = ma.auto_field()
    username = ma.auto_field()

singular_name_schema = DancerNames()
list_names_schema =  DancerNames(many=True)    

#-----------------------------------------End of Schemas-------------------------------------------

@app.route("/login", methods = ["Post"])
def login():

    #User Table is for user verification
    
    data =request.get_json()
    user = User.query.filter_by(username=data['email']).first()
    print("user: ",user)
    if user:
        if user.authenticate(data['password']):
            session["username"] = user.username
                      
            return (
             {
                "username" : user.username,
                "isparent" : user.isparent,
                "isadmin"  : user.isadmin
             }
            )
        
        else:
           return ["message:", " Password incorrect"], 401
    else:
        return ["message:", " User does not exist, Please signup"],401  
    
@app.route("/logout", methods =["DELETE"])
def logout():
    if session.get("username"):
        session['username'] = None
        return {}, 204
    return ["message:", "User not Found"], 404

@app.route("/check_session", methods = ["GET"])
def check_session():

    user=User.query.filter(User.username == session.get('username')).first()
        
    if user:
        return (
            {
              "username" : user.username,
              "isparent" : user.isparent,
              "isadmin"  : user.isadmin
             }
 
            ),200
    else:
            return ["Message", "Unauthorized"], 401  

@app.route("/check_admin_password", methods = ["POST"])
def check_admin_password():
     
     data =request.get_json()
     password = Password.query.filter_by(id=1).first()
     if password.authenticate(data['password']):
        return ["message:", " Password incorrect"], 201
     else:
         return ["message:", " Password incorrect"], 401

#----------------------------------End of Custom Routes ------------------------------

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
            first = data['p_first'],
            last = data['p_last'],
            address = data['p_address'],
            email = data['p_email'],
            phone = data['p_phone'],
            is_balance = False,
            balance = 0,
        )
        #set username = email
        parent.username = parent.email
        db.session.add(parent)

        #add emergency contact
        emergency = Emergency(
            name = data['e_name'],
            email = data['e_email'],
            phone = data['e_phone'],
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
        password = data['password']
        user.password_hash = password
        users.append(user)

        #add parent to user table
        user = User(
            name = f"{parent.first} {parent.last}",
            username = parent.username,
            isparent = True,
            isadmin = False
        )   
        password = data['p_password']
        user.password_hash =  password
        users.append(user)
        db.session.add_all(users)

        #commit the parent, dancer, emergency, user tables
        try:
            db.session.commit()
        except IntegrityError as error:
            for error in error.orig.args:
                if "UNIQUE" in error:
                    failed_item=error[24:]
                    response = make_response(['Message', f"{failed_item} already taken"],422)
                    return response
                elif "CHECK" in error:
                    return (["Message", "Bio needs to be at least 50 chars"]),422
        
        #link Parent and Emergency Contact to Dancer through foreignKey
        newdancer = Dancer.query.filter_by(username=dancer.username).first()  
        newparent = Parent.query.filter_by(username=parent.username).first()
        newemergency = Emergency.query.filter_by(name=emergency.name).first()    
        
        newdancer.parent_id = newparent.id
        newdancer.emergency_id = newemergency.id
        db.session.commit()
        
        session["username"] = parent.username 

        return (
            {
              "username" : user.username,
              "isparent" : user.isparent,
              "isadmin"  : user.isadmin
             }
 
            ),201
  
class DeleteDancer(Resource):
    def delete(self,username):
       
       # Only parent or Admin is authorized to delete a dancer 
       # When deleting a dancer we also delete the dancer from the following:
       #    remove dancer from the user table.
       #    delete the parent if dancer is the only child in the dance club
       #    delete the emergency contact this is the only dancer for that contact
       #    if Parent is logged in they are immediately logged out unless they're an admin
       # dancer is automatically deleted from any association tables

       dancer = Dancer.query.filter_by(username=username).first()
       # Everything rides on dancer existing
       # if dancer exist then we link everthing else to that dancer to be deleted.       
       if dancer:
            
            parent = Parent.query.filter_by(id=dancer.parent_id).first()
            auth_user = User.query.filter_by(username=session.get("username")).first()
            emergency = Emergency.query.filter_by(id=dancer.emergency_id).first()
            users=User.query.all()
            p_length=len(parent.dancers)
            e_length=len(emergency.dancers)

            # if current user is admin or the parent        
            if auth_user.isadmin or parent.username == auth_user.username:
                #remove dancer from user table    

                for user in users:
                    if user.username == dancer.username:
                        db.session.delete(user)

                #delete dancer 
                db.session.delete(dancer)

                # remove parent from parent table if dancer is only child
                # If parent is not an admin they're removed from user table and logged out.
                print("length is: ",p_length )
                print("length is: ", e_length)
                
                if e_length == 1:
                    db.session.delete(emergency)
                
                if p_length == 1: 
                    print("do you get here?")    
                    db.session.delete(parent)
                    if auth_user.username == parent.username:
                        if not auth_user.isadmin:
                            print("you should not be here")
                            #delete parent from user table remove session
                            db.session.delete(auth_user)
                            session['username'] = None  
                            db.session.commit()        
                            return ("Remove_Session"), 201
                print("its me!!")        
                db.session.commit() 
                return {}, 204
            else:
                return ["Message: ","Only Parent or Admin can delete a dancer"], 401  
       else:
            return ["Message: ","User Not Found"], 404  

class Dancers(Resource):
    def get(self):
        
        # Only admin can list all the dancer information:

        user = User.query.filter_by(username=session.get('username')).first()
        dancers = list_dancers_schema.dump(Dancer.query.all())
        if dancers:
            if user.isadmin:
                response = make_response (dancers, 200)
                return response
            else:
                return  ["Message:", " User Not Authorized"], 401 
        return ["Message:", " Dancers Not Found"], 404       

class AddDancer(Resource):

    def post(self):
        #Only Parent or admin can add a dancer. 
        #Parent can only add their child

        data = request.get_json()

        user = User.query.filter_by(username=session.get("username")).first()
        parent = Parent.query.filter_by(username=data['pemail']).first() 

        if parent:
            if parent.username == user.username or user.isadmin:
                
                #python date
                birthdate = datetime.strptime(data['dob'],'%Y-%m-%d').date()

                #Get emergency contact    
                dancers = Dancer.query.all()
                for dancer in dancers:
                    if dancer.parent_id == parent.id:
                       new_dancer_emergency_id = dancer.emergency_id

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
                    parent_id = parent.id,
                    emergency_id = new_dancer_emergency_id
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
                        if "UNIQUE" in error:
                            response = make_response(['Message:', " Email already taken"],422)
                            return response
                        elif "CHECK" in error:
                            return (["Message"," Bio needs to be at least 50 chars"],422)

                response = make_response([singular_dancer_schema.dump(dancer)], 201)
                return response
            else:
                return  ["Message:"," Only the Parent or and Admin can add a dancer" ], 401
        else:
            return  ["Message:","Parent does not exist"], 401    

class ModifyDancer(Resource):
    def patch(self,id):
        # Only admin, parent or dancer can modify dancer

        dancer = Dancer.query.filter_by(id=id).first() 
        parent = Parent.query.filter_by(id=dancer.parent_id).first()
        user = User.query.filter_by(username=session.get('username')).first()
        dancer_user = User.query.filter_by(username=dancer.username).first()

        print("this is user",user)
        if user.isadmin or session.get('username') == dancer.username or session.get('username') == parent.username:    
            if dancer:
                data = request.json
                for key,value in data.items():
                    if key == "first":
                        print("this is value of first",value)
                        dancer.first=value
                    elif key == "last":
                        dancer.last=value
                    elif key == "email":
                        dancer.email = value
                        dancer.username = value
                        dancer_user.username = value
                    elif key == "phone":
                        dancer.phone = value
                    elif key == "gender":
                        dancer.gender = value
                    elif key == "dob":
                        dancer.dob = value
                    elif key == "bio":
                        dancer.bio = value
                    elif key == "image":
                        dancer.image = value
                
                #Check for password:
                for key,value in data.items():
                    if key == 'password':
                       user.password_hash = 'password'
       
                db.session.commit() 

                response = make_response([singular_dancer_schema.dump(dancer)], 202)       
                return response
            else:
                return [{"Message": "User Not Found"}], 404  
        else:
            return [{"Message":"User Not Authorized"}], 401 

class DancerByID(Resource):
   def get(self,email):
       
       #Only dancer, Parent, or admin
       dancer = Dancer.query.filter_by(email=email).first() 
           
       if dancer:
            parent = Parent.query.filter_by(id=dancer.parent_id).first()
            user = User.query.filter_by(username=session.get("username")).first()

            if session.get("username") == dancer.username or session.get("username") == parent.username or user.isadmin:
                action = request.args.get('action')
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
                    return ["Message","Invalid action"], 444 
                return response
            else: 
               return ["Message: ","Only Dancer, Parent or Admin can access a dancer's information"], 401 
       else:
            response = make_response(["Message"," Dancer does not exist"], 404)
            return response

class Parents(Resource):
    def get(self):
        # Only admin can list all parent information

        user = User.query.filter_by(username=session.get("username")).first()

        parents = list_parentlist_schema.dump(Parent.query.all())
               
        if parents:
            if user.isadmin:
                response = make_response (parents,200)
                return response
            else:
                return ["Message: ","User Not Authorized"], 401
        return ["Message: ","Dancers Not Found"], 404  

class ParentByID(Resource):
   def get(self,id):
       #Only Parent and Admin has access
       
       parent = Parent.query.filter_by(id=id).first() 
       user = User.query.filter_by(username=session.get("username"))
       
       if parent:
            if user.isadmin or session.get("username") == parent.username :
                response = make_response(singular_parentlist_schema.dump(parent), 201)
                return response
            return ["Message:","User Not authorized"], 401  
       else:
           return ["Message:","Invalid Parent" ], 404  
       
class ModifyParent(Resource):
    def patch(self,id):
        #Only parent or admin is authorized

        parent = Parent.query.filter_by(id=id).first()   
        parent_user = User.query.filter_by(username=parent.username).first()
        user = User.query.filter_by(username=session.get("username"))
        
        if parent:
            if session.get('user_id') == parent.id or user.isadmin:
                data = request.json
                for key,value in data.items():
                    if key == "first":
                        parent.first=value
                    elif key == "last":
                        parent.last=value
                    elif key == "email":
                        parent.email = value
                        parent.username = value
                        parent_user.username=value
                    elif key == "phone":
                        parent.phone = value
                    elif key == "address":
                        parent.address = value
                    db.session.commit()    
                response = make_response([singular_parentlist_schema.dump(parent)], 202) 
            else:
                return  [{"Message":"User Not Authorized"}], 401            
        else:
            return [{"Message":"Parent Not Found"}], 404  
        return response

class Events(Resource):
    def get(self):

        events = list_event_schema.dump(Event.query.all())

        if events:
            response = make_response(events, 201)
            return response
        return ["Message:", "No Events Scheduled"], 404

class AddEvent(Resource):
    def post(self):
        #Only admin can add an event
        user = User.query.filter_by(username=session.get("username")).first()

        if user.isadmin:
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
            return  ["Message","User Not Authorized"], 401 
    
class ModifyEvent(Resource):
    def patch(self,id):
        
        user = User.query.filter_by(username=session.get("username")).first()

        if user.isadmin:

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
        user = User.query.filter_by(username=session.get("username")).first()
        print ("This is user",user)
        if user.isadmin:
            event = Event.query.filter_by(id=id).first()
            
            if event:
                db.session.delete(event)
                db.session.commit()
                return {}, 204
            else:
                return ["Message","Event Not Found"], 404   
        else:
            return  ["Message:","User Not Authorized"], 401     

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
                 response = make_response(list_names_schema.dump(event.dancers), 201)
            elif action == "nodancers":
                print("this is else") 
                not_listed=[]
                dancers = Dancer.query.all()
                for dancer in dancers:
                    if dancer not in event.dancers:
                         not_listed.append(dancer)
                response = make_response(list_names_schema.dump(not_listed), 201)          
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
       
        user = User.query.filter_by(username=session.get("username")).first()

        if user.isadmin:
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
                return (["Message: ", "Invalid Action Practice"], 404)
            return response
        else:
            return ["Message: ", "User not authorized"], 401

class AddPractice(Resource):
    def post(self):
        # Only admin can add to the practice schedule

        user = User.query.filter_by(username=session.get("username")).first()
        
        if user.isadmin:
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
            return ["Message", "User not authorized"], 401
    
class ModifyPractice(Resource):
    def patch(self,id):
        #only Admin can modify practice schedule
        user = User.query.filter_by(username=session.get("username")).first()
        if user.isadmin:
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
                return ["Message", "No Events Scheduled"], 404
            return response
        else:
            return ["Message", "User not authorized"], 401

class DeletePractice(Resource):
    def delete(self,id):

        #Only admin can delete practice from schedule
        user = User.query.filter_by(username=session.get("username")).first()
        
        if user.isadmin:
            print("user.isadmin:", user.isadmin)
            practice = Practice.query.filter_by(id=id).first()
            if practice:
                db.session.delete(practice)
                db.session.commit()
                return {}, 204
            else:
                return ["Message","Event Not Found"], 404   
        else:
            return ["Message","User not authorized"],401    

class Users(Resource):
    def get(self):

        #Only admin has access to list of user
        user = User.query.filter_by(username=session.get("username"))
        
        users = list_users_schema.dump(User.query.all()) 
        
        if user.isamin:
            if users:
                if session.get("isadmin"):
                    response = make_response (users,200)
                    return response
                else:
                    return [{"Message":"User Not Authorized"}], 401
            return [{"Message":"Users Not Found"}], 404  
        else:
            return [{"message": "User not authorized"}], 401

class ListBalances(Resource):
    def get(self):
        
        user = User.query.filter_by(username=session.get("username"))
        
        if user.isadmin:
            list_balance=[]
            parents = Parent.query.all()
            for parent in parents:
                if parent.balance > 0:
                    list_balance.append(parent) 
            if len(list_balance) > 0: 
                response = make_response(list_parentlist_schema.dump(list_balance),200)
                return response
            else:
                return [{"message" :"No balances"}], 200
        else:
            return [{"message" :"User not authorized"}], 401  

class AddToEvent(Resource):
    def post(self,id1,id2):
     
       user = User.query.filter_by(username=session.get("username"))
       dancer = Dancer.query.filter_by(id=id1).first()
       event = Event.query.filter_by(id=id2).first()
       parent = Parent.query.filter_by(id=dancer.parent_id)
       
       if dancer:
           if event:
              if user.isadmin or user.username == dancer.username or user.username == parent.username:
                    if event in dancer.events:
                        return [{"message":"Dancer already exist for this event"}], 208
                    else:
                        event.dancers.append(dancer)   
                        db.session.commit() 
                        return [{"message":"Dancer added to event"}], 201 
              else:
                   return [{"message":"User is not authorized"}], 401  
           else:
               return [{"message":"Event does not exist"}], 404    
       else:
           return [{"message":"Dancer does not exist"}], 404      

class AddToPractice(Resource):
    def post(self,id1,id2):
      
       user = User.query.filter_by(username=session.get("username"))
       dancer = Dancer.query.filter_by(id=id1).first()
       parent = Parent.query.filter_by(id=dancer.parent_id)
       practice = Practice.query.filter_by(id=id2).first()

       if dancer:
           if practice:
              if user.isadmin or dancer.id == id1 or user.username == parent.usernam:
                    if practice in dancer.practices:
                        return [{"message":"Dancer already exist for this event"}], 208
                    else:
                        practice.dancers.append(dancer)   
                        db.session.commit() 
                        return [{"message":"Dancer added to practice"}], 201 
              else:
                   return [{"message":"User is not authorized"}], 401  
           else:
               return [{"message":"Practice Schedule does not exist"}], 404    
       else:
           return [{"message":"Dancer does not exist"}], 404      

class DeleteFromPractice(Resource):
    def delete(self, id1, id2):
      
       user = User.query.filter_by(username=session.get("username"))
       dancer = Dancer.query.filter_by(id=id1).first()
       parent = Parent.query.filter_by(id=dancer.parent_id)
       practice = Practice.query.filter_by(id=id2).first()
      
       if dancer:
           if practice:
              if user.isadmin or dancer.id == id1 or user.username == parent.usernam:
                  if dancer in practice.dancers:
                      practice.dancers.remove(dancer) 
                      db.session.commit()
                      return {}, 204 
                  else:
                      return [{"message":"Dancer not scheduled"}], 404   
              else:
                  return [{"message":"User not authorized"}], 401    
           else:
               return [{"message":"Practice Schedule does not exist"}], 404
       else:               
           return [{"message":"Dancer does not exist"}], 404        

class DeleteFromEvent(Resource):
    def delete(self, id1, id2):
       
       user = User.query.filter_by(username=session.get("username"))
       parent = Parent.query.filter_by(id=dancer.parent_id)
       dancer = Dancer.query.filter_by(id=id1).first()
       event = Event.query.filter_by(id=id2).first()
       if dancer:
           if event:
              if user.isadmin or dancer.id == id1 or user.username == parent.username:
                  if dancer in event.dancers:
                      event.dancers.remove(dancer) 
                      db.session.commit()
                      return {}, 204 
                  else:
                      return ["message","Dancer not scheduled for event"], 404   
              else:
                  return ["message","User not authorized"], 401    
           else:
               return ["message","Event does not exist"], 404
       else:               
           return ["message","Dancer does not exist"], 404        

class Admin(Resource):
    def post(self):
        
        user=User.query.filter_by(username=session.get("username")).first() 
        if user.isadmin:
            #Get input for Admin
            data = request.get_json()
            if data["picked"] == "true":
                p_user = User.query.filter_by(username=data["email"]).first()
                if p_user:
                    p_user.isadmin = True
                else:
                    return ["Message: ","Parent Does Exist"], 401 
            else:
                #add admin to user table
                user = User(
                    name = data['name'],
                    username = data['email'],
                    isparent = False,
                    isadmin = True
                )   
                password = data['password']
                user.password_hash =  password
                db.session.add(user)

            db.session.commit()

            response = make_response (singular_user_schema.dump(user),200)
            return response
        else:
            return ["Message: ","User Not Authorized"], 401 

api.add_resource(Dancers, '/dancers', endpoint='dancers')
api.add_resource(DancerByID,'/dancers/<string:email>', endpoint='dancer/<string:email>')
api.add_resource(AddDancer,'/dancers/add', endpoint='dancer/add')
api.add_resource(DeleteDancer,'/dancers/delete/<string:username>', endpoint='dancer/delete/username')
api.add_resource(ModifyDancer,'/dancers/modify/<int:id>', endpoint='dancer/modify/<int:id>')

api.add_resource(Parents, '/parents', endpoint='parents')
api.add_resource(ParentByID,'/parents/<int:id>', endpoint='parent/id')
api.add_resource(ModifyParent,'/parents/modify/<int:id>', endpoint='parent/modify/id')

api.add_resource(Events, '/events', endpoint='events')
api.add_resource(EventByID, '/events/<int:id>', endpoint='event/id')
api.add_resource(AddEvent, '/events/add', endpoint='event/add')
api.add_resource(DeleteEvent, '/events/delete/<int:id>', endpoint='event/delete/id')
api.add_resource(ModifyEvent, '/events/modify/<int:id>', endpoint='event/modify/id')
api.add_resource(AddToEvent, '/events/add/<int:id1>/<int:id2>', endpoint='event/add/id/id')
api.add_resource(DeleteFromEvent, '/events/delete/<int:id1>/<int:id2>', endpoint='event/delete/id/id')

api.add_resource(Practices, '/practices', endpoint='practices')
api.add_resource(PracticeByID, '/practices/<int:id>', endpoint='practice/id')
api.add_resource(AddPractice, '/practices/add', endpoint='practice/add')
api.add_resource(DeletePractice, '/practices/delete/<int:id>', endpoint='practice/delete/id')
api.add_resource(ModifyPractice, '/practices/modify/<int:id>', endpoint='practice/modify/id')
api.add_resource(AddToPractice, '/practices/add/<int:id1>/<int:id2>', endpoint='practice/add/id/id')
api.add_resource(DeleteFromPractice, '/practices/delete/<int:id1>/<int:id2>', endpoint='practice/delete/id/id')

api.add_resource(Users, '/users', endpoint='/users')
api.add_resource(Signup, '/signup', endpoint='/signup')
api.add_resource(ListBalances, '/balances', endpoint='/balances')
api.add_resource(Admin, '/admin', endpoint='/admin')

if __name__ == '__main__':
    with app.app_context():
        clean_parents()
        clean_emergency()
        clean_dancers()
        keep_age_current()
    app.run(port=5555,debug=True)

 