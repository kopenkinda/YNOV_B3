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

-- Vérifierla valeur de la session, que constatez-vous?
SHOW SESSION VARIABLES LIKE 'sort_buffer_size';
```

<img src="./assets/img_3_b.png" />
<img src="./assets/img_3_b1.png" />
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

## 4. Visualisation de la configuration

```
Vous pouvez alors comparer avec le fichier my.cnf
```
