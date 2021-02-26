DROP DATABASE IF EXISTS NCN2_DB;
CREATE DATABASE NCN2_DB;

USE NCN2_DB;

CREATE TABLE Jokes (
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  quote TEXT(100) NOT NULL,
  author VARCHAR( 60 ) NOT NULL,
  origin VARCHAR( 60 ) NOT NULL,

  PRIMARY KEY ( id ) 
);


INSERT INTO Jokes (quote, author, origin) 
VALUES ("'Anyone ever wonder why dads have so many great jokes? - We have a DAD-abase full of them.'", 'u/CrunchyBrisket', 'Reddit');
INSERT INTO Jokes (quote, author, origin) 
VALUES ("'I have come here to chew bubblegum and kick ass...and I'm all out of bubblegum.'", 'Dave Ready', 'They Live (movie)');
INSERT INTO Jokes (quote, author, origin) 
VALUES ("'A bald man got a great deal on a wig today - only $1! - it was a small price toupee.'", 'u/cerebolic-parabellum', 'Reddit');
INSERT INTO Jokes (quote, author, origin) 
VALUES ("'Somebody threw a bottle of Omega-3 pills at my head! - it's ok though, as my injuries are only SUPER-FISH-OIL.'", 'u/Alternative-Thanks37', 'Reddit');
INSERT INTO Jokes (quote, author, origin) 
VALUES ("'What do you call James Bond taking a bath? - bubble O 7'", 'u/cerebolic-parabellum', 'Reddit');

SELECT * FROM Jokes;


    


