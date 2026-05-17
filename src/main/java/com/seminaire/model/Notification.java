package com.seminaire.model;

import java.time.LocalDateTime;

public class Notification {
    private String id;
    private String destinataireId;
    private String typeNotification;
    private String message;
    private LocalDateTime dateEnvoi;
    private boolean estLue;

    public Notification() {
        this.estLue = false;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDestinataireId() {
        return destinataireId;
    }

    public void setDestinataireId(String destinataireId) {
        this.destinataireId = destinataireId;
    }

    public String getTypeNotification() {
        return typeNotification;
    }

    public void setTypeNotification(String typeNotification) {
        this.typeNotification = typeNotification;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getDateEnvoi() {
        return dateEnvoi;
    }

    public void setDateEnvoi(LocalDateTime dateEnvoi) {
        this.dateEnvoi = dateEnvoi;
    }

    public boolean isEstLue() {
        return estLue;
    }

    public void setEstLue(boolean estLue) {
        this.estLue = estLue;
    }
}
