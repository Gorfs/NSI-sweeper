import  os
from SQL2 import *

base_dir = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(base_dir, "vault_13.db")
DB = DB(db_path)
DB.create_connection()

DB.delete_user("Gorf")