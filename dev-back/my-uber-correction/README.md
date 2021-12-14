# TP Uber-like

## Resto en ligne : Sujet

Vous devez mettre en place la gestion des livraisons d'un restaurant

> TP à faire à 2 max

### API client : 8 points

-   [x] ajouter des produits au panier /api/client/product/
-   [x] saisir adresse + numéro de tel /api/client/profile
-   [x] valider la commande /api/client/order
-   [x] consulter l'état de sa commande seller_accept/seller_refuse/seller_ready/shipping_in_progress/shipped

### Api resto : 6 points

-   [x] voir les commandes passées par les clients /api/seller/order
-   [x] traiter une commande : accept/refuse/ready

### Api livreur : 6 points

-   [x] voir les commandes à livrer /api/shipper/order
-   [x] traiter une commande : accept/refuse/shipped

### Infos de déploiement(-2pts):

-   [ ] Nom de domaine : my-uber.test
-   [ ] BD : my-uber

### Livrables :

-   [ ] zip des sources
-   [ ] readme d'installation (-2pts)
-   [ ] Export script postman (-8pts)
-   [ ] Bonus suivre le livreur (+4pts)
-   [ ] afficher les coordonnées GPS de l'adresse

### Bonus client (+4pts)

-   [ ] suivre le GPS du livreur

## Resto en ligne : Installation

-   `cp .env.example .env`
-   Modifier les variables DB_USERNAME, DB_PASSWORD dans .env
-   `php artisan migrate:fresh`
-   `php artisan db:seed`
-   `php artisan serve`
