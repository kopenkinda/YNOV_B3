# 28 - nbSalle dans la table Segment (nombre de salles traversées par le segment);
UPDATE segment s
Set s.nbSalle = (
    Select COUNT(*)
    FROM salle sa
    WHERE s.indIP = sa.indIP
  );
# 29 - nbPoste dans la table Segment (nombre de postes du segment);
# 30 - nbInstall dans la table Logiciel (nombre d ’ installations du logiciel);
# 31 - nbLog dans la table Poste (nombre de logiciels installés par poste).Vérifier le contenu des tables modifiées (Segment, Logiciel et Poste).