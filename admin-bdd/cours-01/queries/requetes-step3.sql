# 8 - Pour chaque poste, le nombre de logiciels installés (en utilisant la table Installer).
Select distinct nPoste,
	count(nLog)
from installer
group by nPoste;
# 9 - Pour chaque salle, le nombre de postes (à partir de la table Poste).
Select distinct nSalle,
	count(nomPoste)
from poste
group by nSalle;
# 10 - Pour chaque logiciel, le nombre d’installations sur des postes différents.
Select distinct nLog,
	count(nPoste)
from installer
group by nLog;
# 11 - Moyenne des prix des logiciels "UNIX".
SELECT AVG(prix)
FROM logiciel
WHERE typeLog LIKE "UNIX";
# 12 - Plus récente date d’achat d’un logiciel.
SELECT dateAch
FROM logiciel
ORDER BY dateAch DESC
LIMIT 1;
# 13 - Numéros des postes hébergeant 2 logiciels.
SELECT DISTINCT nPoste
FROM installer
GROUP BY nLog;
# 14 - Nombre de postes hébergeant 2 logiciels
# (utiliser la requête précédente en faisant un SELECT dans la
# clause FROM).
SELECT DISTINCT nPoste
FROM installer
WHERE nPoste IN (
		SELECT nPoste
		FROM installer
		GROUP BY nLog
	);