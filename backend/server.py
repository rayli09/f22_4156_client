import json
from flask import Flask, jsonify, request, session
from flask_session import Session
import requests
import db_service
from flask_cors import CORS

REMOTE_SERVICE_ENDPOINT = 'http://easymoneytest-env.eba-gxycxg4j.us-east-1.elasticbeanstalk.com'
SERVICE_ENDPOINT = 'http://localhost:8080'

app = Flask(__name__)
CORS(app)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.before_request
def load_user():
    if 'token' not in session and request.endpoint != 'auth':
        return {'url' : '/auth'}

@app.route('/auth/<action>', methods=['POST'])
def auth(action):
    if request.method != 'POST':
        return "auth only supports post"
    if action == 'register':
        return handle_register(request)
    elif action == 'login':
        return handle_login(request)

@app.route('/')
def hello_world():
    return "hello world"

@app.route('/assets/<uid>')
def manage_assets(uid):
    # TODO needs refactoring
    method = request.method
    if method == 'GET':
        assets = db_service.query_db('select * from assets where uid = ?', [uid])
        return assets
    elif method == 'POST':
        ass = request.json
        new_ass_id = db_service.insert_db('insert into assets (amount,desc,owner_id) values (?,?,?,?) ', 
        [ass['amount'], ass['desc'], ass['owner_id']])
        return "{} has been created.".format(new_ass_id)
    elif method == 'DELETE':
        pass
    
    return 'NOT SUPPORTED'

@app.route('/profile/<uid>')
def my_profile(uid):
    #TODO needs refactoring query by uid
    method = request.method
    if method == 'GET':
        return db_service.query_db('select * from users where uid = ?', [uid])
    elif method == 'POST':
        p = request.json
        new_p_id = db_service.insert_db('insert into users (username,ad1,ad2,ad3) values (?,?,?,?) ', 
        [p['username'], p['ad1'], p['ad2'], p['ad3']])
        return "{} has been created.".format(new_p_id)
    return 'NOT SUPPORTED'

@app.route('/feed/<uid>', methods=['GET', 'POST'])
def user_feed(uid):
    """
    get user's feed by uid or inject ads into the feed.

    Injection: simply create dummy transfers from business user to the personal user with the promotion text.
    """
    rsp = 'NOT FOUND.'
    if request.method == 'GET':
        rsp = get_feed_by_uid(uid)
        return json.loads(rsp.text)
    elif request.method == 'POST':
        return create_transfer(request, uid)
    return rsp
############## HELPERS ##############
def get_token():
    return {'Authorization' : session['token']}

def handle_register(request):
    # TODO make sure userType is business
    rsp = requests.post('{S}/auth/register'.format(S=SERVICE_ENDPOINT), json = request.json)
    # use json.loads to parse json properly
    return json.loads(rsp.text)

def handle_login(request):
    req = request.json
    try:
        rsp = requests.post('{S}/auth/login'.format(S=SERVICE_ENDPOINT), json = req)
        print(rsp.text)
        token = rsp.text
        session['token'] = token
        return {"token" : token}
    except Exception as err:
        return "err when login: {}".format(err)

def get_feed_by_uid(uid):
    return requests.get('{S}/feed/'.format(S=SERVICE_ENDPOINT, uid=uid), headers = get_token())

def create_transfer(request, tuid):
    # TODO parse ads && details from request json
    req = request.json
    # get biz user uid, personal user uid
    # TODO THIS IS HARDCODED!! fromuid is the current user, i.e. business user's uid
    f_uid = 1
    payload = {
        "fromUid": f_uid,
        "toUid" : tuid,
        "amount" : 0.1,
        "description" : "INJECTED ADS",
        "category": "FOOD"
    }
    # insert a transfer from biz to personal user
    try:
        rsp = requests.post(
            '{S}/transfer/create'.format(S=SERVICE_ENDPOINT), 
            json=payload, 
            headers = get_token())
        print("rsp : " + rsp.text)
    except Exception as err:
        return "err in creating transfer : {}".format(err)
    return json.loads(rsp.text)



