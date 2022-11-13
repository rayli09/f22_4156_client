from flask import Flask

app = Flask(__name__)

@app.route('/profile')
def my_profile():
    response_body = {
        "name": "Ruize Li",
        "about" :"WTF I just got laid off"
    }

    return response_body


