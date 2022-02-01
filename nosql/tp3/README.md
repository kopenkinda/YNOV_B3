# TP 03

> Kopenkin Dmitrii

## A - Movies

1. Quelle est la note moyenne de tout les films ?
   ```js
   use('tp3');
   db.movies.aggregate([
     {
       $group: {
         _id: null,
         average: { $avg: '$imdb.rating' },
       },
     },
   ]);
   ```
   <img src="https://i.imgur.com/tcXcIWP.png" />
   <br />
2. À l’aide d’une d’agrégation, donner le nombre de film réalisés par année
   ```js
   use('tp3');
   db.movies.aggregate([
     {
       $group: {
         _id: '$year',
         count: { $sum: 1 },
       },
     },
   ]);
   ```
    <img src="https://i.imgur.com/RKkneqs.png">
    <br />
3. À l’aide d’une pipeline d’agrégation, et de la question 2, donnez les 3 années les plus productive en terme de réalisation de films.
   ```js
   use('tp3');
   db.movies.aggregate([
     {
       $group: {
         _id: '$year',
         count: { $sum: 1 },
       },
     },
     {
       $sort: {
         count: -1,
       },
     },
     {
       $limit: 3,
     },
   ]);
   ```
    <img src="https://i.imgur.com/xXloT0I.png">
    <br/>
4. Quel est le titre du film, selon imdb, le mieux noté ?
   ```js
   use('tp3');
   db.movies
     .find({
       'imdb.rating': {
         $ne: '',
       },
     })
     .sort({
       'imdb.rating': -1,
     })
     .limit(1);
   ```
    <img src="https://i.imgur.com/yc9cCCi.png">
    <br/>
5. Combien de films ont exactement 2 genres ? Combien ont au moins 3 genre ?
   ```js
   use('tp3');
   db.movies
     .find({
       genres: { $size: 2 },
     })
     .size();
   db.movies
     .find({
       genres: { $exists: true },
       $where: 'this.genres.length >= 3',
     })
     .size();
   ```
    <img src="https://i.imgur.com/AcxQCxU.png">
    <br/>
    <img src="https://i.imgur.com/CHzfH1s.png">
    <br/>
6. Combien de genres un film possède t’il au maximum ?
   ```js
   use('tp3');
   db.movies.aggregate([
     {
       $sort: {
         'genres.size': 1,
       },
     },
     {
       $limit: 1,
     },
     {
       $addFields: {
         genres_amount: {
           $size: '$genres',
         },
       },
     },
     {
       $project: {
         genres_amount: '$genres_amount',
       },
     },
   ]);
   ```
    <img src="https://i.imgur.com/Hqeg3xj.png">
    <br/>
7. Sur l’ensemble des films de la collection, combien de langue différentes
   trouves-t-on ?
   ```js
   use('tp3');
   db.movies.distinct('languages').length;
   ```
    <img src="https://i.imgur.com/YK5tZal.png">
    <br/>
8. Combien de films sont disponible en langue des signes ?
   Partial Text Search : Regex ou /search/ (^\\\*)
   ```js
   use('tp3');
   db.movies.find({ languages: /sign language/i }).size();
   ```
    <img src="https://i.imgur.com/pUhibTL.png">
    <br/>
9. Donnez le nombre de film sortis après le 19 Mai 2014
   ```js
   use('tp3');
   db.movies
     .find({
       released: {
         $gt: ISODate('2014-05-19'),
       },
     })
     .size();
   ```
    <img src="https://i.imgur.com/uMSeLYA.png">
    <br/>
10. Sur les films sortis après le 19 Mai 2014 (Question 8), donnez le nombre d’entre
    eux qui d’une durée minimum de 2h30
    ```js
    use('tp3');
    db.movies
      .find({
        released: {
          $gt: ISODate('2014-05-19'),
        },
        runtime: {
          $gt: 150,
        },
      })
      .size();
    ```
    <img src="https://i.imgur.com/qZiJZ2N.png">
    <br/>

## B - Movies & Comments

Dans cette partie nous allons mettre en relation la collection movies et comments.

1. Créez une pipeline d’agrégation ajoutant aux documents de la collection movies
   les commentaires associés dans la collection comments
   ```js
   use('tp3');
   db.movies.aggregate([
     {
       $lookup: {
         from: 'comments',
         localField: '_id',
         foreignField: 'movie_id',
         as: 'comments',
       },
     },
   ]);
   ```
    <img src="https://i.imgur.com/GvGOuZF.png">
    <br/>
2. Donnez le nombre de film ayant au moins 100 commentaires.
   ```js
   use('tp3');
   db.movies.aggregate([
     {
       $lookup: {
         from: 'comments',
         localField: '_id',
         foreignField: 'movie_id',
         as: 'comments',
       },
     },
     {
       $unwind: {
         path: '$comments',
       },
     },
     {
       $group: {
         _id: '$_id',
         count: {
           $sum: 1,
         },
         comments: {
           $push: '$comments',
         },
       },
     },
     {
       $match: {
         count: {
           $gte: 100,
         },
       },
     },
   ]);
   ```
   <img src="https://i.imgur.com/nUJXXKx.png">
   <br/>

- en fonction de l’environnement, cette requête peut occasionner un timeout. Si
  pas de résultat, expliquez la requête.

## C - Pipelines d’Agrégation Complexes

1. Créez une agrégation permettant de grouper les films par années et genres dans
   une nouvelle collection nommée movies_genres_by_year.
   Note : $unwind pour exploser un tableau
   ```js
   use('tp3');
   db.movies.aggregate([
     {
       $group: {
         _id: {
           year: '$year',
           genres: '$genres',
         },
         count: {
           $sum: 1,
         },
       },
     },
     {
       $unwind: '$_id.genres',
     },
     {
       $project: {
         _id: 0,
         year: '$_id.year',
         genres: '$_id.genres',
         count: '$count',
       },
     },
     {
       $out: 'movies_genres_by_year',
     },
   ]);
   ```
   <img src="https://i.imgur.com/Feg7tiV.png">
   <br/>
2. Créez une pipeline d’agrégation pour créer une collection de documents avec
   les informations suivantes :<br/><img src="https://i.imgur.com/F2NLXxr.png"><br/>
   ```js
   use('tp3');
   db.movies.aggregate([
     {
       $unwind: '$directors',
     },
     {
       $group: {
         _id: '$directors',
         count: {
           $sum: 1,
         },
         victories: {
           $sum: '$awards.wins',
         },
         nominations: {
           $sum: '$awards.nominations',
         },
       },
     },
     {
       $project: {
         _id: 0,
         director: '$_id',
         count: '$count',
         victories: '$victories',
         nominations: '$nominations',
       },
     },
   ]);
   ```
   <img src="https://i.imgur.com/LnJszwy.png">
   <br/>
3. Créez une pipeline d’agrégation permettant de récupérer la note moyenne
   d’IMDB par pays de production.
   ```js
   use('tp3');
   db.movies.aggregate([
     {
       $unwind: '$countries',
     },
     {
       $group: {
         _id: '$countries',
         average: {
           $avg: '$imdb.rating',
         },
       },
     },
   ]);
   ```
   <img src="https://i.imgur.com/ux0drk5.png">
   <br/>
4. Créez une pipeline d’agrégation permettant de récupérer le nombre de film
   disponibles par langues.
   ```js
   use('tp3');
   db.movies.aggregate([
     {
       $unwind: '$languages',
     },
     {
       $group: {
         _id: '$languages',
         count: {
           $sum: 1,
         },
       },
     },
   ]);
   ```
   <img src="https://i.imgur.com/K54lfwi.png">
   <br/>
