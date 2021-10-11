# 1 - Type du poste 'p8'.
SELECT typeP
FROM pcseuls
WHERE nP = "p8";
# 2 - Noms des logiciels 'UNIX'.
SELECT nomLog
FROM logiciel
WHERE typeLog = "UNIX";
# 3 - Noms, adresses IP, numéros de salle des postes de type 'UNIX' ou 'PCWS'.
SELECT nomPoste,
  indIP,
  nSalle
FROM poste
WHERE typePoste = "UNIX"
  OR typePoste = "PCWS";
# 4 - Même requête pour les postes du segment '130.120.80' triés par numéros de salles décroissants.
SELECT nomPoste,
  indIP,
  nSalle
FROM poste
WHERE indIP = "130.120.80"
ORDER BY nSalle desc;
# 5 - Numéros des logiciels installés sur le poste 'p6'.
SELECT nomLog
FROM logiciel
WHERE typeLog = "UNIX";
# 6 - Numéros des postes qui hébergent le logiciel 'log1'.
SELECT nPoste
FROM POSTE
WHERE typePoste LIKE 'UNIX';
# 7 - Noms et adresses IP complètes (ex : '130.120.80.01')
# des postes de type 'TX' (utiliser la fonction de concaténation).
SELECT nomPoste,
  CONCAT(indIp, ad) as ipComplete
FROM POSTE
WHERE typePoste LIKE 'TX';