Cahier des charges:

Project: Demineur html et IA pour le resoudre

personnes: Archie Beales, Francois Thomas, Hartman Quentin

description: Faire une page html qui a un jeu demineur qui est possible de joueur,
Faire un bot qui peut commencer a n'importe qu'elle point et resoudre le demineur

TODO: 29 avril

- Finir sommarie du code
- faire le plan des diapo pour la presentation
- Finir la fonction explode Tiles
- faire que le premier click explode plein de Tiles pour aider
- faire des ID pour chaque utilisateur, dans la DB
- faire une page de profile
- mettre en place du anti dupe pour envoyer les noms des joueurs vers la DB

Somaire du Code

## main.py

Class Score:

un sous classe de Leaderboard, fais pour contenir les informations du username et du temps pour faire le demineur

Class LeaderBoard:

une classe qui represente le leaderboard en lui meme, contien une methode pour retourner tous les valeur du leaderboard sous forme d'une liste de liste

Script Flask:

du script qui est le corpus du webserver en lui meme, c'est ce code qui rejet les DOMs vers le naviguateurs.

si la methode de la demande http est du forme POST alors sa prend les infos du form et l'envoir vers la base de donnee

Executions du code:

execute le code et done commencer de traiter les requetes http.



## SQL.py

findValues()

Prend une le from depuis une query http et renvoie les donner de la form qui est l'username et le mdp

main()

commence une connection avec la base de donne

create_connection()

trouve le ficher ou se trouve la base de donner et renvoie une connection que sqlite peux  utiliser

insert_into_db()

si la form est correct renvoie le resultat de findValues() dans la base de donner

retreive All from DB()

renvoie tous les donner de la base de donne sour form de dictionaire

delete_all_from_db()

supprime tous depuis la base de donner

## Index.JS

declaration de constantes et de variables utililser dans le code 

win()

est appeler des que une reussite du joueur est detecter, trigger un fond vert et l'apparition du form

lose()

est appeler si le joueur appuis sur une bombe. trigger un fond rouge

generateGame()

la fonction principale qui genere le jeux, cree le cube, rajoute une bouton a chaque cube et detect le premier click

addMines()

la fonction qui genere des mines toute autour de joueur sauf sur la case qui est placer dans les parametre, est appeler hors de GenerateGame() pour evite que le joueur perd sans pouvoir jouer meme

count_mines()

renvoie le nombre de mines qui sont present sur le jeux

tilesToCount()

prend les coordonnee du cube et renvoie les cubes qui sont autours dans une liste, est necessaire pour evite des tiles qui n'existent pas



explodeMind()

show 

**Lundi 28/03** 

*Objectif:*

Faire lien form avec BDD avec programme python?

Interface création profile + BDD pour profilé et lien avec form.réalité:	

-réussite de test web server sur un pc hors que ceux du lycée	

- réussite de mettre en place le form html pour les scores	
- - réussite de recevoire ces score dans le fichier python	
  - - reussite de commit la base de données et création de la premiere tables	
    -  echec de commencer le bot selenium -création du fichier python pour interaction avec la BDD

**Lundi 04/04**

*Objectif:*	

-cree le leaderboard	

-modifier la fonction explode tiles pour faire les nombre (redesign)	

-remplir le fichier python pour la base de donnée	

-rajouter la possibilter de flag les tuiles

*realiter:*	

-quentin a apris ce que c’est une XPATH,	

-quentin a fais un bot qui ouvre firefox, et CLICK	

-quenting a appris ce que c’est une document xml

**lundi 25/04**

-mis en place de la page leaderboard sur le demineur

-mis en place du code en python pour prendre les information de la base de donner et de le render sur la page web

-continuation du travaille sur la fonction explode_tiles

-le bot demineur peut maintenant choisir quelle cube il veut clicker dessus