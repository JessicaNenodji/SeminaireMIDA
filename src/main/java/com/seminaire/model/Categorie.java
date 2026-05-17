package com.seminaire.model;

public class Categorie {
    private String id;
    private String nom;
    private String description;
    private boolean estActive;

    public Categorie() {
        this.estActive = true;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isEstActive() {
        return estActive;
    }

    public void setEstActive(boolean estActive) {
        this.estActive = estActive;
    }
}
