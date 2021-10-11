# 15 - Types de postes non recensés dans le parc informatique (utiliser la table Types).
SELECT t.typeLP
FROM types t
WHERE t.typeLP NOT IN (
    SELECT p.typePoste
    FROM poste p
  );
# 16 - Types existant à la fois comme types de postes et de logiciels.
SELECT DISTINCT p.typePoste
FROM poste p
WHERE p.typePoste IN (
    SELECT l.typeLog
    FROM logiciel l
  );
# 17 - Types de postes de travail n’étant pas des types de logiciels. Jointures procédurales
SELECT DISTINCT typePoste
FROM Poste
WHERE typePoste NOT IN (
    SELECT typeLog
    FROM Logiciel
  );
# 18 - Adresses IP complètes des postes qui hébergent le logiciel 'log6'.
SELECT CONCAT(indIP, '.', ad)
FROM Poste
WHERE nPoste IN (
    SELECT nPoste
    FROM Installer
    WHERE nLog = 'log6'
  );
# 19 - Adresses IP complètes des postes qui hébergent le logiciel de nom 'Oracle 8'.
SELECT CONCAT(indIP, '.', ad)
FROM Poste
WHERE nPoste IN (
    SELECT nPoste
    FROM Installer
    WHERE nLog IN (
        SELECT nLog
        FROM Logiciel
        WHERE nomLog = 'Oracle 8'
      )
  );
# 20 - Noms des segments possédant exactement trois postes de travail de type 'TX'.
SELECT nomSegment
FROM Segment
WHERE indIP IN (
    SELECT indIP
    FROM Poste
    WHERE typePoste = 'TX'
    GROUP BY indIP
    HAVING COUNT(*) = 3
  );
# 21 - Noms des salles où l’on peut trouver au moins un poste hébergeant le logiciel 'Oracle 6'.
SELECT nomSalle
FROM Salle
WHERE nSalle IN (
    SELECT nSalle
    FROM Poste
    WHERE nPoste IN (
        SELECT nPoste
        FROM Installer
        WHERE nLog IN (
            SELECT nLog
            FROM Logiciel
            WHERE nomLog = 'Oracle 6'
          )
      )
  );
# 22 - Nom du logiciel acheté́le plus récent (utiliser la requête 12).
SELECT nomLog
FROM Logiciel
WHERE dateAch = (
    SELECT dateAch
    FROM logiciel
    ORDER BY dateAch DESC
    LIMIT 1
  );