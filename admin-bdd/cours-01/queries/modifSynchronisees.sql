# 28 - nbSalle dans la table Segment (nombre de salles traversées par le segment);
UPDATE segment s
Set s.nbSalle = (
    Select COUNT(*)
    FROM salle sa
    WHERE s.indIP = sa.indIP
  );
# 29 - nbPoste dans la table Segment (nombre de postes du segment);
Update segment s
SET s.nbPoste = (
    Select COUNT(*)
    FROm poste p
    where p.indIP = s.indIP
  );
# 30 - nbInstall dans la table Logiciel (nombre d ’ installations du logiciel);
Update logiciel l
SET l.nbInstall = (
    Select COUNT(*)
    FROM installer i
    where i.nLog = l.nLog
  );
# 31 - nbLog dans la table Poste (nombre de logiciels installés par poste).Vérifier le contenu des tables modifiées (Segment, Logiciel et Poste).
Update poste p
SET p.nbLog = (
    Select COUNT(*)
    FROM installer i
    where i.nPoste = p.nPoste
  );