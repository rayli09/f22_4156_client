from flask import Flask, jsonify, request
import requests
import db_service
from flask_cors import CORS

SERVICE_ENDPOINT = 'http://easymoneytest-env.eba-gxycxg4j.us-east-1.elasticbeanstalk.com'
app = Flask(__name__)
CORS(app)
@app.route('/')
def helloworld():
    return "hello world"

@app.route('/assets/<uid>')
def manage_assets(uid):
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
    #TODO query by uid
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
    # get/set user's feed by uid
    rsp = 'NOT FOUND.'
    if request.method == 'GET':
        rsp = requests.get('{S}/feed/{uid}'.format(S=SERVICE_ENDPOINT, uid=uid))
    elif request.method == 'POST':
        rsp = requests.post('{S}/feed/{uid}'.format(S=SERVICE_ENDPOINT, uid=uid), json=request.json)
    return rsp.text




