package com.seminaire.model;

public class Citoyen extends AbstractUtilisateur {
    private String adresse;
    private String telephone;

    public Citoyen() {
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }
}
