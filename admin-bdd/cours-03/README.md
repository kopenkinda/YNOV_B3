# TP Journaux

- Dmitrii Kopenkin
- Theo Arnal

## Partie I

### Le journal binaire

**Activez le journal binaire(binlog) et définissez son fichier d’index.**  
Editez le fichier de configuration `/etc/my.cnf.d/server.cnf`:

```conf
[mysqld]
    log_bin = /var/log/mysql/mysql-bin.log
    log_bin_index = mysql-bin-log.index
    expire_logs_days = 10
    max_binlog_size = 100M
    binlog_format = mixed
```

**Quel est le fichier binaire courant**
`/var/lib/mysql/mysql-bin`

```sql
show global variables like 'log_bin_basename';
```

### Le journal des requêtes lentes

**Activer le journal des requêtes lentes.**

```sql
SET GLOBAL slow_query_log = 'ON';
```

```conf
[mysqld]
    slow_query_log='ON'
    slow_query_log_file=/var/log/mysql/slow-queries.log
```

**Changer le fichier de configuration pour mettre un seuil faible pour les requêtes lentes**

```conf
[mysqld]
    long_query_time=1
```

**Configurez l’interception de toutes les requêtes sans index.**

```conf
[mysqld]
    log_queries_not_using_indexes
```

**Redémarrer le serveur**

```bash
sudo systmectl restart mysql
```

**Tracer l’exécution d’une requête avec la commande EXPLAIN (une requête quelconque du TP1)**

```sql
EXPLAIN SELECT sg.nomSegment as nomSeg,   s.nSalle as numSalle,   CONCAT(p.indIP, '.', p.ad) as ipFull,   l.nomLog,   i.dateIns FROM Poste p   JOIN Salle s ON s.nSalle = p.nSalle   JOIN Segment sg ON s.indIP = sg.indIP   JOIN Installer i ON p.nPoste = i.nPoste   JOIN Logiciel l ON i.nLog = l.nLog ORDER BY nomSeg,   numSalle,   ipFull;
```

```
+------+-------------+-------+--------+---------------+---------+---------+---------------+------+-------------------------------------------------+
| id   | select_type | table | type   | possible_keys | key     | key_len | ref           | rows | Extra                                           |
+------+-------------+-------+--------+---------------+---------+---------+---------------+------+-------------------------------------------------+
|    1 | SIMPLE      | p     | ALL    | PRIMARY       | NULL    | NULL    | NULL          | 1    | Using where; Using temporary; Using filesort    |
|    1 | SIMPLE      | i     | ALL    | NULL          | NULL    | NULL    | NULL          | 1    | Using where; Using join buffer (flat, BNL join) |
|    1 | SIMPLE      | l     | eq_ref | PRIMARY       | PRIMARY | 22      | tp01.i.nLog   | 1    |                                                 |
|    1 | SIMPLE      | s     | eq_ref | PRIMARY       | PRIMARY | 30      | tp01.p.nSalle | 1    | Using where                                     |
|    1 | SIMPLE      | sg    | eq_ref | PRIMARY       | PRIMARY | 46      | tp01.s.indIP  | 1    |                                                 |
+------+-------------+-------+--------+---------------+---------+---------+---------------+------+-------------------------------------------------+

```

**Analyser le fichier des logs des requêtes lentes et analyser les informations relatives à la requête de la question précédente**

<!-- TODO -->

**Quelles sont donc les différentes informations que l’on peut trouver dans le journaldes requêtes lentes?**

```
/usr/bin/mariadbd, Version: 10.6.4-MariaDB-log (Arch Linux). started with:
Tcp port: 0  Unix socket: (null)
Time		    Id Command	Argument
# Time: 211108 16:55:17
# User@Host: root[root] @ localhost []
# Thread_id: 4  Schema: tp01  QC_hit: No
# Query_time: 0.001029  Lock_time: 0.000606  Rows_sent: 5  Rows_examined: 0
# Rows_affected: 0  Bytes_sent: 684
use tp01;
SET timestamp=1636386917;
explain SELECT sg.nomSegment as nomSeg,   s.nSalle as numSalle,   CONCAT(p.indIP, '.', p.ad) as ipFull,   l.nomLog,   i.dateIns FROM Poste p   JOIN Salle s ON s.nSalle = p.nSalle   JOIN Segment sg ON s.indIP = sg.indIP   JOIN Installer i ON p.nPoste = i.nPoste   JOIN Logiciel l ON i.nLog = l.nLog ORDER BY nomSeg,   numSalle,   ipFull;

```

```
Time
Utilisateur
Thread ID
Temps d'execution
Lignes affectes
Commande
```

**Utiliser l’outil natif mysqldumpslow pour analyser la même information**

```bash
$ sudo mysqldumpslow slow-queries.log
```

```
Reading mysql slow query log from slow-queries.log
Count: 2  Time=0.00s (0s)  Lock=0.00s (0s)  Rows_sent=5.0 (10), Rows_examined=0.0 (0), Rows_affected=0.0 (0), root[root]@localhost
  explain SELECT sg.nomSegment as nomSeg,   s.nSalle as numSalle,   CONCAT(p.indIP, 'S', p.ad) as ipFull,   l.nomLog,   i.dateIns FROM Poste p   JOIN Salle s ON s.nSalle = p.nSalle   JOIN Segment sg ON s.indIP = sg.indIP   JOIN Installer i ON p.nPoste = i.nPoste   JOIN Logiciel l ON i.nLog = l.nLog ORDER BY nomSeg,   numSalle,   ipFull
```

### Le journal généraldes connexions et requêtes

**Activezle fichier des logs grâceaux commandes:**

```sql
SET GLOBAL general_log = 'ON';
```

**Indiquez le nom et le chemin du fichier grâce:**

```sql
SHOW GLOBAL VARIABLES LIKE 'general_log_file';
```

**Analysez le fichier mysql.log**

<!-- TODO -->

**Désactivezce journal pour votre session avec le paramètresql_log_off.**

```sql
SET SESSION SQL_LOG_OFF=1;
```

**Configurez votre ficher pour orienter les logs dans une table:système (mysql.general_log)**

```sql
USE mysql;
CREATE TABLE IF NOT EXISTS`general_log` (
`event_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
`user_host` mediumtext NOT NULL,
`thread_id` bigint(21) unsigned NOT NULL,
`server_id` int(10) unsigned NOT NULL,
`command_type` varchar(64) NOT NULL,
`argument` mediumtext NOT NULL
) ENGINE=CSV DEFAULT CHARSET=utf8 COMMENT='General log';

SET global general_log = 1;
SET global log_output = 'table';
```

## Partie II

Script logrotate `/etc/logrotate.d/logrotate-script`

```
/var/log/mysql/*.log {
    daily
    dateext
    rotate 56
    nocompress
    nocopytruncate
    ifempty
    nomissingok
    nocreate
    noolddir
    nomail
    extension .sql.gz
}
```

```bash
$ logrotate -f /etc/logrotate.d/logrotate-script
```
