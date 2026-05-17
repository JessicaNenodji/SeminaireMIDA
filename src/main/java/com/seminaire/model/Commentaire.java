package com.seminaire.model;

import java.time.LocalDateTime;

public class Commentaire {
    private String id;
    private String plainteId;
    private String auteurId;
    private String contenu;
    private LocalDateTime dateCreation;
    private boolean estInterne;

    public Commentaire() {
        this.estInterne = false;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPlainteId() {
        return plainteId;
    }

    public void setPlainteId(String plainteId) {
        this.plainteId = plainteId;
    }

    public String getAuteurId() {
        return auteurId;
    }

    public void setAuteurId(String auteurId) {
        this.auteurId = auteurId;
    }

    public String getContenu() {
        return contenu;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }

    public LocalDateTime getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDateTime dateCreation) {
        this.dateCreation = dateCreation;
    }

    public boolean isEstInterne() {
        return estInterne;
    }

    public void setEstInterne(boolean estInterne) {
        this.estInterne = estInterne;
    }
}
