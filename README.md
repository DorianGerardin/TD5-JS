# ![](ressources/logo.jpeg) Prog web client riche - JavaScript

### IUT Montpellier-Sète – Département Informatique

## TD4
#### _Thème : l'objet XMLHttpRequest, requêtes AJAX_

Cliquez sur le lien ci-dessous pour faire, dans un dossier public_html/JS/TD4, votre fork privé du TD4 (**attention, pas de fork à la main !**):

https://classroom.github.com/a/kOejRRzk

la version [pdf](ressources/td4.pdf)

## INTRODUCTION

Dans ce TD, nous allons découvrir et manipuler un objet très important en JavaScript : l’objet **XMLHttpRequest**.

Cet objet est une interface JavaScript permettant de communiquer avec un serveur pour recueillir des données.

Il permet par exemple de lancer des requêtes sur une base de données, mais aussi, plus simplement, de recueillir des données affichées par un simple `echo` PHP.

Vous utiliserez le format `JSON`, qui offre un format très lisible et compréhensible d’échange de données, et que vous pouvez utiliser en **PHP** et en **JavaScript**. Ce format sera utilisé simplement au travers de fonctions PHP (`json_encode`) et JS (`JSON.parse`).

## EXERCICE 1 – premier exemple simple

1. Vous disposez d'un fichier `ex1/coucou.php` dont le seul objectif est d’afficher « coucou ».

		<?php echo "coucou"; ?>

2. De votre navigateur, faites une requête `http` sur la page `coucou.php` puis ouvrez la console JavaScript (F12, onglet console).

3. Entrez la commande suivante

		let xhr = new XMLHttpRequest();

   Cette commande instancie un nouvel objet JavaScript de type `XMLHttRequest`, stocké dans la variable `xhr`.

4. Cet objet sert à lancer des requêtes au serveur. Nous allons lancer, grâce à la variable `xhr`, une requête à la page `coucou.php`. Pour cela, entrez les commandes suivantes dans la console :

		xhr.readyState;					// état de xhr
		xhr.responseText;					// contenu texte de la réponse
		xhr.open("GET","votre url vers coucou.php",true);	// ouverture de la requête
		xhr.readyState;					// état de xhr
		xhr.responseText;					// contenu texte de la réponse
		xhr.send(null);					// envoi de la requête
		xhr.readyState;					// état de xhr
		xhr.responseText;					// contenu texte de la réponse

	+ `readyState` donne l’état d’avancement de la requête, voir cours plus tard
	  (valeurs de 0 à 4)
	+ `responseText` donne l’état actuel de la réponse textuelle à la requête
	+ la méthode `open` donne à `xhr` tous les éléments pour lancer la requête.
	+ la méthode `send` envoie la requête (le paramètre `null` vient du fait que
 	  la méthode est GET, voir plus tard dans le cours).
	+ le paramètre `true` de la méthode `open` sera détaillé dans le cours.

5. Commentez l’évolution des attributs `readystate` et `responseText`.


## EXERCICE 2 – Utilisation de json_encode (PHP) et de JSON.parse (JS)


1. Examinez le contenu du fichier `src/ex2/haddock_v1.php` puis appelez-le dans le navigateur. Vérifiez qu'à l'affichage, vous obtenez bien une chaîne de caractères correspondant à un tableau équivalent à celui stocké dans la variable `$haddock`.

2. comme dans le premier exemple, créez un objet `XMLHttpRequest` puis lancez les commandes suivantes :

		let xhr = new XMLHttpRequest();		
		xhr.open("GET","votre url vers haddock_v1.php",true);
		xhr.send(null);
		xhr.readyState;
		xhr.responseText;
		let resultat = xhr.responseText;
		resultat;
		let tab = JSON.parse(resultat);
		tab;


## EXERCICE 3 – Utilisation de json_encode (PHP) et de JSON.parse (JS)


1. Examinez le contenu du fichier `src/ex3/haddock_v2.php` puis appelez-le dans le navigateur. Vérifiez qu'à l'affichage, vous obtenez bien une chaîne de caractères correspondant à un tableau équivalent à celui stocké dans la variable `$haddock`.

2. comme dans le premier exemple, créez un objet `XMLHttpRequest` puis lancez les commandes suivantes :

		let xhr = new XMLHttpRequest();		
		xhr.open("GET","votre url vers haddock_v2.php",true);
		xhr.send(null);
		xhr.readyState;
		xhr.responseText;
		let resultat = xhr.responseText;
		resultat;
		let obj = JSON.parse(resultat);
		obj;


3. Remarques sur la variable `obj` ?


## EXERCICE 4 – chargement long d’un fichier texte


Il peut arriver que le chargement des données à recueillir soit assez long. Dans ce cas l’attribut `readystate` ne passe pas immédiatement à la valeur 4.

L’événement `load` traduit la fin du chargement des données.

On va donc mettre l’objet `xhr` en état d’écoute de cet événement.

Voici les commandes :

		let xhr = new XMLHttpRequest();		
		xhr.open("GET","un_certain_fichier.txt",true);
		xhr.addEventListener("load",function() {
			console.log("chargement terminé !!!");
		});
		xhr.send(null);
		let texte = xhr.responseText;
		texte.length;

remarque : évitez d’afficher directement dans la console la variable texte. Sa taille importante peut faire planter le navigateur...


### Détails :

- on crée un objet `XMLHttpRequest`;
- on lui donne les éléments pour lancer la requête;
- on le met en écoute de l’événement `load`, et quand cet événement se produit, on lance une fonction anonyme qui affiche dans la console « chargement terminé » et on lance la requête.

Cette fonction lancée après la fin du chargement est habituellement appelée fonction **callback**.

Vous allez mettre en œuvre ces commandes en chargeant divers fichiers txt de tailles variées (voir ces fichiers dans le dossier `src/ex4`) :

+ mobydick.txt (environ 1,2 Mo)
+ bible.txt (environ 4,4 Mo)
+ bible2.txt (environ 45 Mo) obtenue par recopie du précédent

voyez-vous un délai pour le lancement de la fonction **callback** ?


## EXERCICE 5 - Chargement à partir d'une table de données

Jusqu'à présent, la programmation PHP serveur permettait un echo basique (simple phrase) ou plus évolué (encodage JSON d'une structure complexe, comme un tableau ou un objet PHP).

Dans cet exercice, il y aura une requête sur une base de données, avec production d'un tableau résultat, puis utilisation de ce tableau par JavaScript. Le contexte : vous disposez d'une table de données, que vous pouvez importer sur votre base de données par le fichier `verbes.sql`. Cette table contient environ 4000 verbes de la langue française. Vous devrez mettre en place une interface de sélection des verbes, et un `<div>` d'affichage des verbes sélectionnés. La sélection se fera soit en cliquant sur un bouton (qui fera apparaître tous les verbes qui commencent par la lettre en question), soit en changeant la valeur du champ texte (qui fera apparaître tous les verbes qui contiennent la séquence de caractères tapée).

Voici un exemple avec utilisation du champ de recherche

<p align="center">
   <img src="ressources/img1.png">
</p>

1. création de l'interface

Vous devez compléter, dans le fichier `js/scripts.js`, le code de la fonction `creer_interface` qui remplira la `<div id="input">` de façon à avoir les `input` suivants :

<p align="center">
   <img src="ressources/img0.png">
</p>

Cette interface sera automatiquement créée au chargement du `<body>`. Ceci se fera au moyen de l'instruction qui est pour le moment commentée et qu'il faudra activer :

`body.onload = creer_interface;`

Les clics sur les divers boutons et les changements sur le champ de recherche seront gérés plus tard.

2. la fonction charger_verbes
