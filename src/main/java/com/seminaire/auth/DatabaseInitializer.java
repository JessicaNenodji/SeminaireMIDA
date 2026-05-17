package com.seminaire.auth;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

@WebListener
public class DatabaseInitializer implements ServletContextListener {
    private static final String URL = "jdbc:mysql://localhost:3306/?useSSL=false&allowPublicKeyRetrieval=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC&allowMultiQueries=true";
    private static final String USER = "root";
    private static final String PASSWORD = "";

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             Statement stmt = conn.createStatement()) {
            stmt.execute("CREATE DATABASE IF NOT EXISTS seminaireMIDA CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
            stmt.execute("USE seminaireMIDA");
            stmt.execute(getCreateSchema());
        } catch (SQLException e) {
            throw new RuntimeException("Impossible d'initialiser la base de données seminaireMIDA", e);
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        // No cleanup required.
    }

    private String getCreateSchema() {
        return "CREATE TABLE IF NOT EXISTS utilisateur ("
                + "id CHAR(36) NOT NULL PRIMARY KEY,"
                + "username VARCHAR(150) NOT NULL UNIQUE,"
                + "email VARCHAR(255) NOT NULL UNIQUE,"
                + "password VARCHAR(255) NOT NULL,"
                + "role ENUM('CITIZEN','AGENT','ADMIN','USER') NOT NULL DEFAULT 'USER',"
                + "nom VARCHAR(255) DEFAULT NULL,"
                + "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,"
                + "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
                + " CREATE TABLE IF NOT EXISTS categorie ("
                + "id CHAR(36) NOT NULL PRIMARY KEY,"
                + "nom VARCHAR(150) NOT NULL UNIQUE,"
                + "description TEXT DEFAULT NULL,"
                + "est_active BOOLEAN DEFAULT TRUE,"
                + "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,"
                + "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
                + " CREATE TABLE IF NOT EXISTS plainte ("
                + "id CHAR(36) NOT NULL PRIMARY KEY,"
                + "numero_dossier VARCHAR(100) NOT NULL UNIQUE,"
                + "titre VARCHAR(255) NOT NULL,"
                + "description TEXT DEFAULT NULL,"
                + "statut ENUM('EN_ATTENTE','EN_COURS','RESOLU','FERME') NOT NULL DEFAULT 'EN_ATTENTE',"
                + "localisation VARCHAR(255) DEFAULT NULL,"
                + "date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,"
                + "date_mise_a_jour DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,"
                + "date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP,"
                + "citoyen_id CHAR(36) NOT NULL,"
                + "agent_id CHAR(36) DEFAULT NULL,"
                + "categorie_id CHAR(36) DEFAULT NULL,"
                + "CONSTRAINT fk_plainte_citoyen FOREIGN KEY (citoyen_id) REFERENCES utilisateur(id),"
                + "CONSTRAINT fk_plainte_agent FOREIGN KEY (agent_id) REFERENCES utilisateur(id),"
                + "CONSTRAINT fk_plainte_categorie FOREIGN KEY (categorie_id) REFERENCES categorie(id)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
                + " CREATE TABLE IF NOT EXISTS commentaire ("
                + "id CHAR(36) NOT NULL PRIMARY KEY,"
                + "plainte_id CHAR(36) NOT NULL,"
                + "auteur_id CHAR(36) NOT NULL,"
                + "contenu TEXT NOT NULL,"
                + "date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,"
                + "est_interne BOOLEAN DEFAULT FALSE,"
                + "CONSTRAINT fk_commentaire_plainte FOREIGN KEY (plainte_id) REFERENCES plainte(id) ON DELETE CASCADE,"
                + "CONSTRAINT fk_commentaire_auteur FOREIGN KEY (auteur_id) REFERENCES utilisateur(id)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
                + " CREATE TABLE IF NOT EXISTS piece_jointe ("
                + "id CHAR(36) NOT NULL PRIMARY KEY,"
                + "plainte_id CHAR(36) NOT NULL,"
                + "nom_fichier VARCHAR(255) NOT NULL,"
                + "type_fichier VARCHAR(100) DEFAULT NULL,"
                + "taille INT DEFAULT NULL,"
                + "chemin_serveur VARCHAR(500) DEFAULT NULL,"
                + "date_upload DATETIME DEFAULT CURRENT_TIMESTAMP,"
                + "CONSTRAINT fk_piece_jointe_plainte FOREIGN KEY (plainte_id) REFERENCES plainte(id) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
                + " CREATE TABLE IF NOT EXISTS audit_log ("
                + "id CHAR(36) NOT NULL PRIMARY KEY,"
                + "action VARCHAR(150) NOT NULL,"
                + "entite VARCHAR(100) NOT NULL,"
                + "date_action DATETIME DEFAULT CURRENT_TIMESTAMP,"
                + "ancienne_valeur TEXT DEFAULT NULL,"
                + "plainte_id CHAR(36) DEFAULT NULL,"
                + "CONSTRAINT fk_audit_log_plainte FOREIGN KEY (plainte_id) REFERENCES plainte(id) ON DELETE SET NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
                + " CREATE TABLE IF NOT EXISTS notification ("
                + "id CHAR(36) NOT NULL PRIMARY KEY,"
                + "destinataire_id CHAR(36) NOT NULL,"
                + "type_notification VARCHAR(100) NOT NULL,"
                + "message TEXT NOT NULL,"
                + "date_envoi DATETIME DEFAULT CURRENT_TIMESTAMP,"
                + "est_lue BOOLEAN DEFAULT FALSE,"
                + "CONSTRAINT fk_notification_destinataire FOREIGN KEY (destinataire_id) REFERENCES utilisateur(id)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
                + " CREATE TABLE IF NOT EXISTS citoyen ("
                + "utilisateur_id CHAR(36) NOT NULL PRIMARY KEY,"
                + "adresse VARCHAR(255) DEFAULT NULL,"
                + "telephone VARCHAR(50) DEFAULT NULL,"
                + "CONSTRAINT fk_citoyen_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
                + " CREATE TABLE IF NOT EXISTS agent ("
                + "utilisateur_id CHAR(36) NOT NULL PRIMARY KEY,"
                + "service VARCHAR(255) DEFAULT NULL,"
                + "matricule VARCHAR(255) DEFAULT NULL,"
                + "disponible BOOLEAN DEFAULT TRUE,"
                + "CONSTRAINT fk_agent_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
                + " CREATE TABLE IF NOT EXISTS administrateur ("
                + "utilisateur_id CHAR(36) NOT NULL PRIMARY KEY,"
                + "niveau_acces INT DEFAULT 1,"
                + "super_admin BOOLEAN DEFAULT FALSE,"
                + "CONSTRAINT fk_admin_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    }
}
