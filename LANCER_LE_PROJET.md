# 🚀 Guide Complet - Lancer le Projet SeminaireMIDA

## 📋 Table des Matières
1. [Démarrage Rapide (Actuellement en cours)](#démarrage-rapide)
2. [Compilation avec Maven](#compilation-avec-maven)
3. [Compilation Manuelle](#compilation-manuelle)
4. [Déploiement sur Tomcat](#déploiement-sur-tomcat)
5. [URLs de l'Application](#urls-de-lapplication)

---

## 🟢 Démarrage Rapide

### Méthode Actuelle (Serveur HTTP Python)

**Le serveur est déjà en cours d'exécution ! ✅**

**Accédez à l'application :**
```
http://localhost:8000
```

**Commande pour redémarrer le serveur :**
```powershell
cd c:\wamp\www\SeminaireMIDA\SeminaireMIDA
python -m http.server 8000
```

**Pour arrêter le serveur :** `Ctrl+C`

---

## 🔨 Compilation avec Maven

### Prérequis
- Maven doit être installé et dans le PATH
- Java 11 ou supérieur

### Commandes Maven

#### 1. Nettoyer et Compiler
```powershell
cd c:\wamp\www\SeminaireMIDA
mvn clean compile
```

#### 2. Compiler + Tests
```powershell
mvn clean test
```

#### 3. Compiler + Créer le WAR
```powershell
mvn clean package
```

#### 4. Compiler + Créer le WAR + Installer localement
```powershell
mvn clean install
```

#### 5. Lancer le serveur de développement Maven
```powershell
cd c:\wamp\www\SeminaireMIDA
mvn jetty:run
```
Puis accédez à : `http://localhost:8080/SeminaireMIDA`

---

## 🛠️ Compilation Manuelle (avec javac)

Si Maven n'est pas disponible, utiliser `javac` directement :

```powershell
# Variables
$srcDir = "c:\wamp\www\SeminaireMIDA\src\main\java"
$libDir = "c:\wamp\www\SeminaireMIDA\lib"
$outputDir = "c:\wamp\www\SeminaireMIDA\build\classes"

# Créer le répertoire de sortie
New-Item -ItemType Directory -Path $outputDir -Force

# Compiler tous les fichiers Java
$javaFiles = Get-ChildItem -Path $srcDir -Filter "*.java" -Recurse | Select-Object -ExpandProperty FullName

javac -d $outputDir -cp "$libDir\*" $javaFiles
```

**Vérifier la compilation :**
```powershell
Get-ChildItem $outputDir -Filter "*.class" -Recurse
```

---

## 🐱 Déploiement sur Tomcat

### Option 1 : Installation et Déploiement Automatique

```powershell
# 1. Télécharger Tomcat 10.x
$tomcatUrl = "https://archive.apache.org/dist/tomcat/tomcat-10/v10.1.24/bin/apache-tomcat-10.1.24.zip"
$tomcatZip = "c:\apache-tomcat-10.1.24.zip"
Invoke-WebRequest -Uri $tomcatUrl -OutFile $tomcatZip

# 2. Extraire
Expand-Archive -Path $tomcatZip -DestinationPath "c:\"

# 3. Copier l'application à Tomcat
$tomcatHome = "c:\apache-tomcat-10.1.24"
Copy-Item -Path "c:\wamp\www\SeminaireMIDA\SeminaireMIDA" -Destination "$tomcatHome\webapps\SeminaireMIDA" -Recurse -Force

# 4. Démarrer Tomcat
& "$tomcatHome\bin\catalina.bat" run
```

**Accédez à l'application :**
```
http://localhost:8080/SeminaireMIDA
```

### Option 2 : Déploiement du WAR

```powershell
# 1. Créer le WAR avec Maven
cd c:\wamp\www\SeminaireMIDA
mvn clean package

# 2. Copier le WAR à Tomcat
$tomcatHome = "c:\apache-tomcat-10.1.24"
Copy-Item -Path "target\SeminaireMIDA-auth-1.0.0.war" -Destination "$tomcatHome\webapps\" -Force

# 3. Redémarrer Tomcat
# Tomcat déploiera automatiquement le WAR
```

---

## 🌐 URLs de l'Application

### Pages Principales
| Page | URL |
|------|-----|
| 🏠 Accueil | `http://localhost:8000` |
| 🔐 Connexion | `http://localhost:8000/login.html` |
| ✍️ Inscription | `http://localhost:8000/register.html` |
| 📋 Dashboard | `http://localhost:8000/home.html` |
| 📊 Mes Plaintes | `http://localhost:8000/complaints.html` |
| ✉️ Nouvelle Plainte | `http://localhost:8000/complaint-form.html` |
| 👤 Mon Profil | `http://localhost:8000/profile.html` |
| 📞 Contact | `http://localhost:8000/contact.html` |

### Servlets (Nécessitent Tomcat)
| Endpoint | Méthode | Servlet |
|----------|---------|---------|
| `/login` | POST | LoginServlet |
| `/register` | POST | RegisterServlet |
| `/home` | GET | HomeServlet |
| `/logout` | GET | LogoutServlet |

---

## ✅ Checklist de Démarrage

- [ ] Java 11+ installé : `java -version`
- [ ] Python 3+ installé : `python --version`
- [ ] Dépendances téléchargées : `lib/javax.servlet-api-4.0.1.jar`
- [ ] Dépendances téléchargées : `lib/mysql-connector-java-5.1.49.jar`
- [ ] Source compilée : `build/classes/` contient les `.class`
- [ ] `web.xml` présent et configuré
- [ ] Serveur HTTP Python démarré sur port 8000

---

## 🔧 Troubleshooting

### Erreur : "Port 8000 already in use"
```powershell
# Trouver le processus qui utilise le port
netstat -ano | findstr :8000

# Arrêter le processus (remplacer PID par le numéro)
taskkill /PID <PID> /F

# Ou utiliser un port différent
python -m http.server 9000
```

### Erreur : "Cannot find javac"
```powershell
# Ajouter Java au PATH
$env:PATH += ";C:\Program Files\Java\jdk-17\bin"

# Ou installer Java si absent
```

### Erreur : "Module 'http.server' not found"
```powershell
# Installer Python (https://www.python.org/downloads/)
# Puis réessayer
python -m http.server 8000
```

---

## 📚 Ressources

- **Projet** : `c:\wamp\www\SeminaireMIDA`
- **Source** : `c:\wamp\www\SeminaireMIDA\src\main\java`
- **Pages Web** : `c:\wamp\www\SeminaireMIDA\SeminaireMIDA`
- **Configuration** : `c:\wamp\www\SeminaireMIDA\SeminaireMIDA\WEB-INF\web.xml`
- **Base de Données** : `c:\wamp\www\SeminaireMIDA\db-schema.sql`

---

## 🎯 Prochaines Étapes Recommandées

1. ✅ **Tester l'interface web** → Visitez http://localhost:8000
2. 📦 **Installer Tomcat** → Pour exécuter les Servlets Java
3. 🗄️ **Configurer MySQL** → Pour la persistance des données
4. 🔐 **Tester l'authentification** → Une fois Tomcat installé
5. 📊 **Tester les Servlets** → POST à `/login`, `/register`, etc.

---

**Créé le:** 2026-04-25  
**Version:** 1.0.0  
**Dernier démarrage:** http://localhost:8000 (Serveur Python HTTP)
