import os, time, sqlite3
from flask import g


def make_dicts(cursor, row):
  return dict((cursor.description[idx][0], value)
    for idx, value in enumerate(row))


#python/sqlite3 stuff taken from http://flask.pocoo.org/docs/1.0/patterns/sqlite3/
def get_db(app):
  db = getattr(g, '_database', None)
  if db is None:
    db = g._database = sqlite3.connect(app.config['DB_PATH'])
  db.row_factory = make_dicts
  return db

def insert_db(app, query, args=()):
  db = get_db(app)
  cur = db.cursor()
  output = cur.execute(query, args)
  db.commit()
  lastrowid = cur.lastrowid
  cur.close()
  return lastrowid

def query_db(app, query, args=(), one=False):
  cur = get_db(app).execute(query, args)
  rv = cur.fetchall()
  cur.close()
  return (rv[0] if rv else None) if one else rv

def close_connection(exception):
  db = getattr(g, '_database', None)
  if db is not None:
      db.close()

def rm_db_if_exists(app):
  if os.path.exists(app.config['DB_PATH']):
    os.remove(app.config['DB_PATH'])

def run_script(app,script):
  with app.app_context():
    db = get_db(app)
    db.cursor().executescript(script)
    db.commit()

def init_db(app):
  with app.app_context():
    rm_db_if_exists(app)
    db = get_db(app)
    with app.open_resource('schema.sql', mode='r') as f:
      db.cursor().executescript(f.read())
    db.commit()
    with app.open_resource('setup.sql', mode='r') as f:
      for line in f.read().split("\n"):
        db.cursor().execute(line)
    db.commit()

