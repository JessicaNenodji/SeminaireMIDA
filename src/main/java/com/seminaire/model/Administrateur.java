package com.seminaire.model;

public class Administrateur extends AbstractUtilisateur {
    private int niveauAcces;
    private boolean superAdmin;

    public Administrateur() {
        this.niveauAcces = 1;
        this.superAdmin = false;
    }

    public int getNiveauAcces() {
        return niveauAcces;
    }

    public void setNiveauAcces(int niveauAcces) {
        this.niveauAcces = niveauAcces;
    }

    public boolean isSuperAdmin() {
        return superAdmin;
    }

    public void setSuperAdmin(boolean superAdmin) {
        this.superAdmin = superAdmin;
    }
}
