from flask import Flask, jsonify, request
import requests
import db_service

SERVICE_ENDPOINT = 'http://easymoneytest-env.eba-gxycxg4j.us-east-1.elasticbeanstalk.com'
app = Flask(__name__)

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
        last_row_id = db_service.insert_db('insert into assets (id,amount,desc,owner_id) values (?,?,?,?) ', 
        [ass['id'], ass['amount'], ass['desc'], ass['owner_id']])
        return last_row_id
    elif method == 'DELETE':
        pass
    return 'NOT SUPPORTED'
    
@app.route('/profile/<uid>')
def my_profile(uid):
    #TODO query by uid
    rsp = {
        "name": "Ruize Li",
        "about" :"WTF I just got laid off"
    }
    return rsp

@app.route('/feed/<uid>', methods=['GET', 'POST'])
def user_feed(uid):
    # get/set user's feed by uid
    rsp = 'NOT FOUND.'
    if request.method == 'GET':
        rsp = requests.get('{S}/feed/{uid}'.format(S=SERVICE_ENDPOINT, uid=uid))
    elif request.method == 'POST':
        rsp = requests.post('{S}/feed/{uid}'.format(S=SERVICE_ENDPOINT, uid=uid), json=request.json)
    return rsp.text




