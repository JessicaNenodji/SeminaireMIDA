package com.seminaire.model;

import java.time.LocalDateTime;

public class PieceJointe {
    private String id;
    private String plainteId;
    private String nomFichier;
    private String typeFichier;
    private int taille;
    private String cheminServeur;
    private LocalDateTime dateUpload;

    public PieceJointe() {
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

    public String getNomFichier() {
        return nomFichier;
    }

    public void setNomFichier(String nomFichier) {
        this.nomFichier = nomFichier;
    }

    public String getTypeFichier() {
        return typeFichier;
    }

    public void setTypeFichier(String typeFichier) {
        this.typeFichier = typeFichier;
    }

    public int getTaille() {
        return taille;
    }

    public void setTaille(int taille) {
        this.taille = taille;
    }

    public String getCheminServeur() {
        return cheminServeur;
    }

    public void setCheminServeur(String cheminServeur) {
        this.cheminServeur = cheminServeur;
    }

    public LocalDateTime getDateUpload() {
        return dateUpload;
    }

    public void setDateUpload(LocalDateTime dateUpload) {
        this.dateUpload = dateUpload;
    }
}
