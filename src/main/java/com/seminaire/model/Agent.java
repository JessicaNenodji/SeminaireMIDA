package com.seminaire.model;

public class Agent extends AbstractUtilisateur {
    private String service;
    private String matricule;
    private boolean disponible;

    public Agent() {
        this.disponible = true;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public boolean isDisponible() {
        return disponible;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }
}
