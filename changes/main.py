from flask import Flask, render_template, request, redirect
from python_to_sql import *
import os # for path of the database

app = Flask(__name__)

@app.route('/' , methods = ['POST', 'GET'])
def index():
  if request.method == 'POST':
    form = request.form

    # link with python_to_sql
    base_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(base_dir, "vault_13.db")
    connection = create_connection(db_path)
    insert_into_db(connection, str(form)) # passes the form to python_to_sql which passes it to sqlite

    print(form)
    return redirect(request.url)
  else:
    return render_template("index.html")

@app.route("/index.html", methods = ['POST', 'GET'])
def index2():
  if request.method == 'POST':
    return request
  else:
    return render_template("index.html")

#this is going to be the section about sql manipulation and how to put it into a website
#todo make the input form for the html file, 
#make the back end that will recieve the variables
#make the sql database for storing the data
#make html file show what is in the database




if  __name__ == "__main__":
  app.run(debug=True)