# 23 - Adresses IP complètes des postes qui hébergent le logiciel 'log6'.
Select CONCAT(p.indIP, ".", p.ad) as "IP Complete"
From poste p
  Join installer i ON i.nPoste = p.nPoste
where i.nLog LIKE "log6";
#  24 - Adresses IP complètes des postes qui hébergent le logiciel de nom 'Oracle 8'.
SELECT CONCAT(pc.seg, ".", pc.ad) as ip
FROM PCSEULS pc
  JOIN LOGICIEL l ON l.typeLog = pc.typeP
WHERE l.nomLog LIKE "Oracle 8";
#  25 - Noms des segments possédant exactement trois postes de travail de type 'TX'.
SELECT s.nomSegment
FROM SEGMENT s
  JOIN POSTE p ON s.indIP = p.indIP
WHERE p.typePoste = "TX"
GROUP BY p.indIP
HAVING COUNT(p.typePoste) = 3;
#  26 - Noms des salles où l’on peut trouver au moins un poste hébergeant le logiciel 'Oracle 6'.
SELECT s.nomSalle
FROM SALLE s
  JOIN POSTE p ON s.nSalle = p.nSalle
  JOIN LOGICIEL l ON p.typePoste = l.typeLog
WHERE l.nomLog = "Oracle 6";
# 27 - Installations (nom segment, nom salle, adresse IP complète, nom logiciel,
# date d’installation) triées par segment, salle et adresse IP
SELECT sg.nomSegment as nomSeg,
  s.nSalle as numSalle,
  CONCAT(p.indIP, '.', p.ad) as ipFull,
  l.nomLog,
  i.dateIns
FROM poste p
  JOIN Salle s ON s.nSalle = p.nSalle
  JOIN segment sg ON s.indIP = sg.indIP
  JOIN installer i ON p.nPoste = i.nPoste
  JOIN logiciel l ON i.nLog = l.nLog
ORDER BY nomSeg,
  numSalle,
  ipFull;