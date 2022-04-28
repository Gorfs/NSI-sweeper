from flask import Flask, render_template, request, redirect
from SQL2 import DB
import os  # for path of the database


class Score:
    """
  un object python utiliser pour stocker les informations de chaque score
  """

    def __init__(self, name: str, time: str) -> None:
        self.playerName = name
        self.score = time


class LeaderBoard:
    '''
  une classe qui est utiliser pour stocker tous les informations concernant les score du demineur
  '''

    def __init__(self, DBscores: dict) -> None:
        self.scores = []
        print("DB output is ", DBscores)
        for item in DBscores:
            self.scores.append([item, DBscores[item]])

    def get_scores(self) -> list:
        """
    returns the scores that were stored in the database in the form of a list of dictionary objects
    """
        return self.scores


app = Flask(__name__)


@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        print("AHA YOU POST REQUEST SCUM, PREPARE TO DIE")
        DB.insert_into_db(request.form)
        print(DB.retrieve_all_from_db())
        return redirect(request.url)
    else:
        print("leaderboard has been asked")
        leaderboard = LeaderBoard(DB.retrieve_all_from_db())
        print("the scores are {}".format(leaderboard.get_scores()))
        return render_template("index.html", scores=leaderboard.get_scores())


@app.route("/index.html", methods=['POST', 'GET'])
def index2():
    if request.method == 'POST':
        print("The request was a post and thus was the reply with the form")
        DB.insert_into_db(request.form)
        return redirect(request.url)
    else:
        print("leaderboard has been asked")
        leaderboard = LeaderBoard(DB.retrieve_all_from_db())
        print("the scores are {}".format(leaderboard.get_scores()))
        return render_template("index.html", scores=leaderboard.get_scores())


@app.route("/leaderboard.html", methods=['GET'])
def leaderboard() -> None:
    print("leaderboard has been asked")
    leaderboard = LeaderBoard(DB.retrieve_all_from_db())
    print("the scores are {}".format(leaderboard.get_scores()))
    return render_template("index.html", scores=leaderboard.get_scores())


# this is going to be the section about sql manipulation and how to put it into a website
# todo make the input form for ,the html file,
# make the back end that will recieve the variables
# make the sql database for storing the data
# make html file show what is in the database

# enfait au niveau de cree le leaderboard, on peut pas trigger du JS avec du python comme le JS
# est client side et pas server side, et python c'est server side.

# donc il faut trouver comment le mettre dans le render template.




if __name__ == "__main__":
    # base stuff
    base_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(base_dir, "vault_13.db")
    DB = DB(db_path)
    DB.create_connection()
    # base stuff end----


    app.run(debug=True)

    # need to filter out all the nonesense for now
