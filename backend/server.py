from flask import Flask

app = Flask(__name__)

@app.route('/profile/<uid>')
def my_profile(uid):
    #TODO query by uid
    rsp = {
        "name": "Ruize Li",
        "about" :"WTF I just got laid off"
    }
    return rsp

@app.route('/feed/<uid>', method=['GET', 'POST'])
def user_feed(uid):
    #TODO get/set user's feed by uid
    # connect to our service
    pass

@app.route('/manageassets')
def manage_assets():
    # LOCAL, manage assete
    pass


