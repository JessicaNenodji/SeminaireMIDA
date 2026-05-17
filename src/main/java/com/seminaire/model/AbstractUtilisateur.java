package com.seminaire.model;

public abstract class AbstractUtilisateur {
    private String id;
    private String nom;

    public AbstractUtilisateur() {
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
}
