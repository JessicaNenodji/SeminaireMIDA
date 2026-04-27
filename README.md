# Sprint 2 - Authentification Seminaire MIDA

## Objectif
Module d'authentification Java pour la gestion de plaintes.

## Contenu
- HTML/CSS pour l'interface de connexion et d'inscription
- Servlets Java pour l'inscription, la connexion, la page d'accueil et la déconnexion
- Connexion à la base MySQL `seminaireMIDA`

## Installation
1. Vérifiez que votre base MySQL WAMP contient la base `seminaireMIDA`.
2. Importez `db-schema.sql` dans phpMyAdmin ou via MySQL.
3. Mettez à jour les paramètres de connexion dans `src/main/java/com/seminaire/auth/DBConnection.java` si nécessaire.
4. Compilez avec Maven : `mvn clean package`.
5. Déployez le WAR généré sur un serveur Java compatible (Tomcat, Jetty, etc.).
6. Accédez à l'application via `http://localhost:8080/SeminaireMIDA-auth/`.

## Notes
- Les mots de passe sont hachés avec SHA-256 avant stockage.
- Le frontend est en HTML/CSS, sans framework JavaScript.
- La page d'accueil protégée est servie par `HomeServlet`.
