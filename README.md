# ProjetWeb
Pour créer le projet en local (/!\ est ce que clone le git install tout le bordel? no lo se) 

1. Installer Node.js
2. Installer WampServer
3. Créer un dossier "projet" sur votre bureau
4. Avec un terminal

cd Desktop\projet

npm init

npm install express --save

npm install mysql --save

npm install bootstrap --save (optionnel?)

5. Lancer l'application web

dans le terminal toujours : node app.js

6. Dans le navigateur 

http://localhost:3000
  
Structure indispensable

___projet

|

___node_modules (avec tous les packages "node init" et les "install")

|

___templates (dossier avec les pages html)

|       |

|       ___home.html (page index du site)

|

___package-lock.json

|

___app.js

