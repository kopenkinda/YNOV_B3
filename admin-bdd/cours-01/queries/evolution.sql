
/* Ajout colonnes */

-- ALTER TABLE Segment
-- 	ADD (nbSalle TINYINT(2) DEFAULT 0, nbPoste TINYINT(2) DEFAULT 0);

-- ALTER TABLE Logiciel 
-- 	ADD nbInstall TINYINT(2) DEFAULT 0;

/* pose des fois pb, faire exit et relancer... */
/* Table '.\bdsoutou\#sql2-804-5' already exists */
 
ALTER TABLE Poste ADD nbLog TINYINT(2) DEFAULT 0;

DESC Segment;
DESC Logiciel;
DESC Poste;

SELECT * FROM Segment;
SELECT * FROM Logiciel;
SELECT * FROM Poste;

/* Modif colonnes */

ALTER TABLE Salle MODIFY nomSalle VARCHAR(30);

DESC Salle;

SELECT * FROM Salle;

/*  tentatives :
    +long 'Brin 2ème étage' : 15 caractères
*/

/* pose des fois pb, faire exit et relancer... */
/* Table '.\bdsoutou\#sql2-804-5' already exists */
 
ALTER TABLE Segment MODIFY nomSegment VARCHAR(15);

/* refusé normal */

ALTER TABLE Segment MODIFY nomSegment VARCHAR(14);

DESC Segment;

SELECT * FROM Segment;

/*
 Ajout de contraintes
 Ajouter la contrainte afin de s’assurer qu’on ne puisse installer 
 plusieurs fois le même logiciel sur un poste de travail donné.
*/

ALTER TABLE Installer 
      ADD CONSTRAINT un_installation UNIQUE(nPoste,nLog);

/* pose des fois pb, faire exit et relancer... */
/* Table '.\bdsoutou\#sql2-804-5' already exists */

ALTER TABLE Poste 
  ADD CONSTRAINT fk_Poste_indIP_Segment  
  FOREIGN KEY(indIP)
  REFERENCES Segment(indIP);

ALTER TABLE Poste 
  ADD CONSTRAINT fk_Poste_nSalle_Salle
  FOREIGN KEY(nSalle)
  REFERENCES Salle(nSalle);

ALTER TABLE Poste 
  ADD CONSTRAINT fk_Poste_typePoste_Types 
  FOREIGN KEY(typePoste)
  REFERENCES Types(typeLP);

ALTER TABLE Installer
  ADD CONSTRAINT fk_Installer_nPoste_Poste
  FOREIGN KEY(nPoste)
  REFERENCES Poste(nPoste);

ALTER TABLE Installer
  ADD CONSTRAINT fk_Installer_nLog_Logiciel
  FOREIGN KEY(nLog)
  REFERENCES Logiciel(nLog);

/* Erreurs justifiées */

ALTER TABLE Logiciel
  ADD CONSTRAINT fk_Logiciel_typeLog_Types 
  FOREIGN KEY(typeLog)
  REFERENCES Types(typeLP);

ALTER TABLE Salle
  ADD CONSTRAINT fk_Salle_indIP_Segment  
  FOREIGN KEY(indIP)
  REFERENCES Segment(indIP);

/* lignes posant pb : */

SELECT nLog FROM Logiciel WHERE typeLog NOT IN (SELECT typeLP FROM Types);

SELECT nSalle FROM Salle WHERE indIP NOT IN (SELECT indIP FROM Segment);


/* résolution des rejets */
/* Supprimer les enregistrements de la table
  Salle qui posent problème. 
*/

DELETE FROM Salle WHERE indIP NOT IN (SELECT indIP FROM Segment);

INSERT INTO Types VALUES ('BeOS','Système Be');


/* commandes OK */

ALTER TABLE Logiciel
  ADD CONSTRAINT fk_Logiciel_typeLog_Types 
  FOREIGN KEY(typeLog)
  REFERENCES Types(typeLP);

ALTER TABLE Salle
  ADD CONSTRAINT fk_Salle_indIP_Segment  
  FOREIGN KEY(indIP)
  REFERENCES Segment(indIP);