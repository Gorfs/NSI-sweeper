from flask import Flask, render_template


app = Flask(__name__)

@app.route('/')
def index():
  return render_template("index.html")

@app.route("/index.html")
def index2():
  return render_template("index.html")

#this is going to be the section about sql manipulation and how to put it into a website
#todo make the input form for the html file, 
#make the back end that will recieve the variables
#make the sql database for storing the data
#make html file show what is in the database




if  __name__ == "__main__":
  app.run(debug=True)