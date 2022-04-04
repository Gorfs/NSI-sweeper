from sqlite3 import *
import os


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
    connection = connect(db_file)
  except Error as e:
    print(e)
  return connection


def insert_into_db(connection, form):
  """
  connection: connection variable created from create_connection
  form: string form requested in main.py
  return: inserts username and time retrieved from form into the connected database
  """
  if len(form) > 33:
    resized_form = form[33:-4]
    username = (resized_form.split("), ("))[0]
    # time
    hours, minutes, seconds= resized_form[-8:].split(":")
    time = 3600 * int(hours) + 60 * int(minutes) + int(seconds)
  else:
    username = str(form)
    time = 1
  #print(resized_form, username, time)

  # insert into database
  cursor = connection.cursor()
  cursor.execute("CREATE TABLE IF NOT EXISTS global (username TEXT, time INT);")
  connection.commit()
  cursor.execute("INSERT INTO global VALUES (%s, %s);" %(username, time))
  connection.commit()


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