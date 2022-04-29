from flask import Flask, render_template, request, redirect
from SQL2 import DB
import os
#forced to declare app before hand for decorators in the class to work
app  =  Flask(__name__)







class Webserver:
    def __init__(self):
        '''
        a webserver object for the minesweeper projects, takes http request and spits out some DOMs in their direction.
        '''
        self.app = Flask(__name__)

    def run(self):
        '''
        methode that starts up the main flask webserver and initialises the database, therefore locking up the main database from other users too
        '''
        # necessary paths for the database
        base_dir = os.path.dirname(os.path.abspath(__file__))
        db_path = os.path.join(base_dir, "vault_13.db")

        # starting up the database
        global DB 
        DB = DB(db_path)
        DB.create_connection()

        # starts serving http requests
        app.run(debug=True)

    @app.route('/')   # if the users asks for no page at all
    def index() -> render_template:
        '''
        if the user asks for no page it will redirect to the minesweeper page
        '''
        return render_template("index.html", scores=LeaderBoard(DB.retrieve_all_from_db()).get_scores())


    @app.route("/index.html", methods=['POST', 'GET'])
    def index2() -> render_template:
        '''
        the home page, also checks for form entries for posting to the database
        '''
        if request.method == 'POST': #the user has posted a form
            DB.insert_into_db(request.form)
            return redirect(request.url) #automatically redirects to the minesweeper page

        else: # the user has just asked the normal minesweeper page
            return render_template("index.html", scores=LeaderBoard(DB.retrieve_all_from_db()).get_scores())

        

class Score:

    def __init__(self, name: str, time: str) -> None:
        """
        Python Object used as a sub-class of LeaderBoard
        """
        self.playerName = name
        self.score = time



class LeaderBoard:

    def __init__(self, DBscores: dict) -> None:
        '''
        Python Object used for storing tons of scores 
        '''
        self.scores = []
        for item in DBscores:
            self.scores.append([item, DBscores[item]])

    def get_scores(self) -> list:
        """
        returns the scores that were stored in the database in the form of a list of dictionary objects
        """
        if len(self.scores) == 0:
            return "leaderboard empty"
        else:
            return self.scores
