#  Projet GameOn

1. Forkez ce repo
2. Il est conseillé d'utiliser VisualStudio Code et vous pouvez utiliser Docker, mais ce n'est pas obligatoire.
3. Il n'y a aucune dépendance.
4. Vous ne devez utiliser que du CSS personnalisé et du JavaScript pur, sans jQuery, Bootstrap ou autre librairie.

## Modifications

### Javascript
- Vérification par validateur HTML et par Javascript.
- Création de la fonction "close" pour la fermeture du popup.
- Envoi du formulaire avec FormData si le formulaire est valide
- Apparition message de succès si le formulaire est valide

### HTML
- Ajout de Favicon
- Ajout de Metas 
- Modification sémantique globale (nav, header, section ...)
- Modification attribut alt des images

### CSS
- Ajustements du responsive ( flex, media query ... )
- Ajustement par rapport à la maquette fournie
- Modification des animations CSS
- Modification des breakpoints
- Ajout de nouvelles classes

## Container Docker (NGINX)

Exécuter les commandes suivante sur le répertoire ou se situe le fichier Dockerfile :

    docker build . -t gameon
    docker run -d -p 8000:80 gameon

##  Auteur

Stéphane LIEUMONT
[Projets OpenClassrooms](https://oc.sli-3d.fr/)
[Portfolio 3D](https://portfolio.sli-3d.fr/)
