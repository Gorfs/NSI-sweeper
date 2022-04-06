from sqlite3 import *
import os

def findValues(form):
  """ input -> resized form as you made it 
      ouput -> a list of 2 elmt being the values
  """
  username = form.split("\'")[1]
  print("username =" , username )
  print("form is " ,form.split("\'"))
  time = form.split("\'")[5]
  return [username , time]

def main():
  """
  return: any function of this module, used for testing the functions
  """
  # path
  base_dir = os.path.dirname(os.path.abspath(__file__))
  db_path = os.path.join(base_dir, "vault_13.db")
  print("\nDatabase Path: "+db_path+"\n")

  connection = create_connection(db_path)
  #delete_all_from_db(connection)
  #insert_into_db(connection, "anne")
  #retrieve_all_from_db(connection)


def create_connection(db_file):
  """
  db_file: string of path of the database
  return: connection string with db_file
  """
  connection = None
  try:
    connection = connect(db_file , check_same_thread=False)
  except Error as e:
    print(e)
  return connection


def insert_into_db(connection, form):
  """
  connection: connection variable created from create_connection
  form: string form requested in main.py
  return: inserts username and time retrieved from form into the connected database
  """
  print(form)
  form = str(form)
  print(form , " now string")
  print(type(form))
  if len(form) > 33:
    values = findValues(form[33:-4])
    print("username = " , values[0])
  else:
    print("form invalid")
    return "form invalid"

  # insert into database
  print(retrieve_all_from_db(connection))
  cursor = connection.cursor()
  cursor.execute("CREATE TABLE IF NOT EXISTS global (username TEXT, time TEXT);")
  connection.commit()
  username = values[0]
  time = values[1]
  cursor.execute("INSERT INTO global(username, time) VALUES(" + "\"" +  str(username) + "\"" + " , " + "\"" + str(time) + "\"" + ");")
  connection.commit()
  print(retrieve_all_from_db(connection))


def retrieve_all_from_db(connection):
  """
  connection: connection variable created from create_connection
  return: dictionary with username as keys and time (in second) as items
  """
  data_dict = {}

  # retrieve data
  cursor = connection.cursor()
  cursor.execute("SELECT * FROM global ORDER BY time;")
  rows = cursor.fetchall()
  for row in rows:
    data_dict[row[0]] = row[1]
  return data_dict


def delete_all_from_db(connection):
  """
  connection: connection variable created from create_connection
  return: deletes every row from 'global' of the connected database
  """
  # deletes every row of connection, use carefully
  cursor = connection.cursor()
  cursor.execute("DELETE FROM global;")
  connection.commit()
  print("All rows from %s were deleted\n" %connection)

#main()