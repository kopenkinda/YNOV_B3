# Moyenne des prix des logiciels 'UNIX'.
SELECT AVG(prix) FROM logiciel WHERE typeLog LIKE "UNIX";

# Plus récente date d’achat d’un logiciel.
SELECT dateAch FROM logiciel ORDER BY dateAch DESC LIMIT 1;

# Numéros des postes hébergeant 2 logiciels.
SELECT DISTINCT nPoste FROM installer GROUP BY nLog;

# Nombre de postes hébergeant 2 logiciels
# (utiliser la requête précédente en faisant un SELECT dans la
# clause FROM).
SELECT DISTINCT nPoste FROM installer WHERE nPoste IN (
	SELECT nPoste FROM installer GROUP BY nLog
);
