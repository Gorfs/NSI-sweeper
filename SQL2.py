from distutils.log import error
from sqlite3 import *
import os

class DB():
    def __init__(self, path:str) -> None:
        '''
        input -> path to the database file
        output -> DB type object with multiple methodes
        desc -> makes a object to be used in other python files to interact with a database
                Must use the create_connection() methode to start up the database and use the other methodes
        '''
        self.connection = None
        self.DB_name = "vault_13.db"
        self.path = path

    
    def create_connection(self) -> None:
        '''
        input -> takes the path to the database file
        output -> Nothing unless error code
        desc -> creates the connection to the database based on the path inputed in as parameter
        includes some basic exception handeling
        '''
        try:
            self.connection = connect(self.path, check_same_thread=False)
        except Error:
            print("there was an error connecting to the database.")
            return "there was an error connection to the database"


    def insert_into_db(self, form:str) -> None:
        if self.connection == None:
            print("Connection not established, please make a connection with self.create_connection()")
        else:
            form = str(form)
            if len(form) > 33:
                values = self.findValues(str(form[33:-4]))
            else:
                print("form invalid")
                return "form invalid"
            cursor = self.connection.cursor()
            cursor.execute("CREATE TABLE IF NOT EXISTS global (username TEXT, time TEXT);")
            self.connection.commit()
            username = values[0]
            time = values[1]
            cursor.execute("INSERT INTO global(username, time) VALUES(" + "\"" +  str(username) + "\"" + " , " + "\"" + str(time) + "\"" + ");")
            self.connection.commit()

    def retrieve_all_from_db(self) -> dict:
        """
        return: dictionary with username as keys and time (in seconds) as items
        """
        if self.connection == None:
            print("Connection not established, please make a connection with self.create_connection()")
        else:
            data_dict = {}

            # retrieve data
            cursor = self.connection.cursor()
            cursor.execute("SELECT * FROM global ORDER BY time;")
            rows = cursor.fetchall()
            for row in rows:
                data_dict[row[0]] = row[1]
            return data_dict

    
    def findValues(self, form:str) -> str:
        """ 
        input -> resized form as you made it 
        ouput -> a list of 2 elmt being the values
        desc -> does not interact with the database, just reformats a string into a list with the username and the password
        """
        username = str(form).split("\'")[1]
        print("username =" , username )
        print("form is " ,form.split("\'"))
        time = form.split("\'")[5]
        return [username , time]

    def delete_all_from_db(self) -> None:
        """
        return: deletes every row from 'global' of the connected database
        """
        # deletes every row of connection, use carefully
        cursor = self.connection.cursor()
        cursor.execute("DELETE FROM global;")
        self.connection.commit()
        print("All rows from %s were deleted\n" %self.connection)
    
    def update_value(self, username:str, value:int) -> None:
        '''
        input -> the username and the value of the person of which to update the time of the score
        output -> None
        desc -> updates a person's score in the database

        note -> not done, need to be made
        '''
        try:
            cursor = self.connection.cursor()
            cursor.execute("UPDATE SET time = {} WHERE username = {}".format(username, int))
            self.connection.commit()
            print("updated the DB")
        except :
            print("error updating the value {} to {} time".format(username, value))
        return 'error code'