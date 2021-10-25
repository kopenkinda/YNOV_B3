# TP 02

## 3. Paramétrage dynamique duserveur

### a. Changement pour la session

```sql
-- Changer la valeur par défaut.

SET SESSION sort_buffer_size = 262143;

-- Vérifierque la nouvelle valeur a bien été prise en charge
SHOW SESSION VARIABLES LIKE 'sort_buffer_size';
```

<img src="./assets/img_3_a.png"/>

### b.Changement global

```sql
-- Changer la valeur par défaut.
SET GLOBAL sort_buffer_size = 262142;

-- Vérifierque la nouvelle valeur a bien été prise en charge
SHOW GLOBAL VARIABLES LIKE 'sort_buffer_size';

-- Vérifier la valeur de la session, que constatez-vous?
SHOW SESSION VARIABLES LIKE 'sort_buffer_size';
```

<img src="./assets/img_3_b.png" />
<img src="./assets/img_3_c.png" />
<p>
Quand on modifie la variable global, on constate que la valeur de la session n'a pas pas changé car nous étions déjà connectez dessus, elle prendra effet lors de notre prochaine connexion
</p>

```sql
-- Redémarrez votre session.
-- Reverfier les valeurs session et global
SHOW GLOBAL VARIABLES LIKE 'sort_buffer_size';
SHOW SESSION VARIABLES LIKE 'sort_buffer_size';
-- Procédez à la modification de ces dernières, mais en les persistants cette fois-ci.
```

<p>La commande ne fonctionne pas car sur la version que nous utilisons, MySql ne prend pas en compte la commande PERSIST</p>

## 5. Visualisation de la configuration

### a. Nombre de connexions simultanées

```sql
-- Modifiez le nombre de connexion par défaut (4 par exemple)
SET GLOBAL max_connections = 4;
-- Ouvrez 4 sessions mysql
-- Ouvre une cinquième session, quese passe-t-il?
```

<img src="./assets/img_5_a.png" /> <br />

### b. Caches de table

```sql
-- Modifier légèrementles valeurs de cache pour les tables
SET GLOBAL table_open_cache = 15;
```

### c. Cache de threads

```sql
-- Changez la valeur par défaut
SET GLOBAL thread_cache_size = 1000;
-- Visualiser cette valeur
SHOW GLOBAL VARIABLES LIKE 'thread_cache_size';
-- La valeur affectée a-t-elle été enregistré dans le fichier de configuration?
```

<img src="./assets/img_5_c.png" /> <br />
En changeant un peu la valeur par défaut cela ne s'enregistre pas dans le fichier de conf
