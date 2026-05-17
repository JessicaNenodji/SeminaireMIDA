package com.seminaire.model;

import java.time.LocalDateTime;

public class AuditLog {
    private String id;
    private String action;
    private String entite;
    private LocalDateTime dateAction;
    private String ancienneValeur;
    private String plainteId;

    public AuditLog() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getEntite() {
        return entite;
    }

    public void setEntite(String entite) {
        this.entite = entite;
    }

    public LocalDateTime getDateAction() {
        return dateAction;
    }

    public void setDateAction(LocalDateTime dateAction) {
        this.dateAction = dateAction;
    }

    public String getAncienneValeur() {
        return ancienneValeur;
    }

    public void setAncienneValeur(String ancienneValeur) {
        this.ancienneValeur = ancienneValeur;
    }

    public String getPlainteId() {
        return plainteId;
    }

    public void setPlainteId(String plainteId) {
        this.plainteId = plainteId;
    }
}
