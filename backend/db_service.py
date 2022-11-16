import sqlite3

DB_PATH = 'database.db'

def start_db():
	conn = sqlite3.connect(DB_PATH)
	with open('schema.sql') as f:
			conn.executescript(f.read())
	conn.commit()
	conn.close()

def make_dicts(cursor, row):
  return dict((cursor.description[idx][0], value)
    for idx, value in enumerate(row))

def get_db():
	db = sqlite3.connect(DB_PATH)
	db.row_factory = make_dicts
	return db

def insert_db(query, args=()):
  db = get_db()
  cur = db.cursor()
  output = cur.execute(query, args)
  db.commit()
  lastrowid = cur.lastrowid
  cur.close()
  return lastrowid

def query_db(query, args=(), one=False):
  cur = get_db().execute(query, args)
  rv = cur.fetchall()
  cur.close()
  return (rv[0] if rv else None) if one else rv
