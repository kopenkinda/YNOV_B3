# TP 2 - NoSQL

## I - Lecture

1.  Combien de sociétés ont été créées durant toute l’année 2010 ?
    `db.getCollection('companies').find({founded_year: 2010}).count()`
    <img src="https://i.imgur.com/QhbqqvT.png"><br/>
2.  Sur les sociétés fondées en 2000, laquelle possède le plus d’employé ? Et
    Combien ?
    `db.getCollection('companies').find({founded_year: 2000}).sort({number_of_employees:-1}).limit(1)`
    <img src="https://i.imgur.com/rlOsU39.png"><br/>
3.  Combien de sociétés ont des bureaux localisés dans la ville de Seattle ?
    `db.getCollection('companies').find({ "offices.city" : 'Seattle' }).count()`
    <img src="https://i.imgur.com/sINtrBA.png"><br/>
4.  Combien de sociétés sont implantées en France pour au moins un bureau ?
    `db.getCollection('companies').find({ 'offices.country_code': 'FRA' }).count()`
    <img src="https://i.imgur.com/I3uHyQa.png"><br/>
5.  Combien de sociétés ont des employés au poste de : Software Engineer ?
    `db.getCollection('companies').find({ 'relationships.title': 'Software Engineer' }).count()`
    <img src="https://i.imgur.com/E43Z5VG.png"><br/>
6.  Quelle société propose le produit : Business Card Printing
    `db.getCollection('companies').find({ "products.name": "Business Card Printing" })`
    <img src="https://i.imgur.com/U5ivaGz.png"><br/>
7.  Ecrivez un query qui donne le nom des 10 sociétés les plus récentes du jeu de
    données.
    <b>Je ne savais pas si je devais effectuer cette requête sur la base de created_at, ou de founded_year, founded_month et founded_day</b>
    `db.getCollection('companies').find({}, {name: true}).sort({created_at: -1}).limit(10)`
    <img src="https://i.imgur.com/glk7sQA.png"><br/>
8.  Donnez la liste des sociétés créées en mai 2000.
    `db.getCollection('companies').find({founded_year: 2000, founded_month: 5})`
    <img src="https://i.imgur.com/j7GbeyC.png"><br/>
9.  Sachant que le sort() en croissant retourne en premier les valeurs nulles. Trouvez
    un moyen (avec une ou plusieurs queries) de donner la liste des 10 plus
    anciennes sociétés du jeu de données.
    `db.getCollection('companies').find({founded_year: {$exists: true, $ne: null}, founded_month: {$exists: true, $ne: null}, founded_day: {$exists: true, $ne: null}}).sort({founded_year: -1, founded_month: -1, founded_day: -1}).limit()`
    <img src="https://i.imgur.com/bhZRmul.png"><br/>
10. Donnez le temps d’exécution des requêtes suivantes :
11. db.companies.find();
    ```js
    use('tp2');
    const startTime = Date.now();
    db.companies.find();
    const endTime = Date.now();
    console.log(endTime - startTime);
    ```
    <img src="https://i.imgur.com/LYiJLDh.png">
12. db.companies.find().sort({founded_year: -1 })
    ```js
    use('tp2');
    const startTime = Date.now();
    db.companies.find().sort({ founded_year: -1 });
    const endTime = Date.now();
    console.log(endTime - startTime + 'ms');
    ```
    <img src="https://i.imgur.com/jMRbMX0.png">

## II - Écriture

1. Créez une collection nommée products contenant 1000 produits, avec une
   propriété de compteur (exemple : product_number) et d’autres champs de votre
   choix.
   ```js
   use('tp2');
   db.createCollection('products');
   const products = [];
   for (let i = 0; i < 1000; i++) {
     products.push({
       product_number: i,
       name: 'Product ' + i,
       price: Math.random() * 100,
       description: 'Description ' + i,
       category: 'Category ' + i,
       sub_category: 'SubCategory ' + i,
       tags: ['tag1', 'tag2', 'tag3'].slice(0, Math.floor(Math.random() * 3)),
       created_at: new Date(),
     });
   }
   db.products.insertMany(products);
   ```
2. Ajoutez au produit numéro 737 une propriété nommée version de type tableau
   contenant les chaines de caractère : [‘MAX-7’, ‘MAX-8’, ‘MAX-9’, ‘MAX-10’]
   ```js
   use('tp2');
   db.products.updateOne({ product_number: 737 }, { $set: { version: ['MAX-7', 'MAX-8', 'MAX-9', 'MAX-10'] } });
   ```
   <img src="https://i.imgur.com/jLFa0pS.png"><br/>
3. Supprimez les produits numéro 13 et 666.
   ```js
   use('tp2');
   db.products.deleteOne({ product_number: 13 });
   db.products.deleteOne({ product_number: 666 });
   ```
   <img src="https://i.imgur.com/KjxwYt2.png"><src/>
4. Pour tout les produits dont le numéro de compteur est pair, ajoutez un champ
   nommé even de type booléen à true.
   ```js
   use('tp2');
   db.products.updateMany({ product_number: { $mod: [2, 0] } }, { $set: { even: true } });
   ```
   <img src="https://i.imgur.com/K3tM7b8.png">
5. Idem pour tout les produits dont le numéro de compteur est impair, ajoutez un
   champ nommé even de type booléen à false.
   ```js
   use('tp2');
   db.products.updateMany({ product_number: { $mod: [2, 1] } }, { $set: { even: true } });
   ```
   <img src="https://i.imgur.com/2mg7mZ1.png">
6. Afficher le nombre de documents avec le champ even à true.
   ```js
   use('tp2');
   db.getCollection('products').find({ even: true }).count();
   ```
   <img src="https://i.imgur.com/Nlt5nbb.png">
7. Incrémentez de 1 le numéro du produit ayant pour id 1000.
   ```js
   use('tp2');
   db.getCollection('products').updateOne({ product_number: 999 }, { $set: { product_number: 1001 } });
   ```
    <img src="https://i.imgur.com/WPKaqSK.png">
8. Corrigez la valeur du champ even du document précédemment modifié.
   ```js
   use('tp2');
   db.getCollection('products').updateOne({ product_number: 1001 }, { $set: { even: false } });
   ```
9. Supprimez tout les produits :

   1. Dont la propriété even est à true à l’aide d’une boucle.
      ```js
      use('tp2');
      for (let i = 0; i < 1002; i += 1) {
        db.products.deleteOne({ product_number: i, even: true });
      }
      ```
   2. Dont la propriété even est à false à l’aide d’une seule commande.
      ```js
      use('tp2');
      db.getCollection('products').deleteMany({ even: false });
      ```
