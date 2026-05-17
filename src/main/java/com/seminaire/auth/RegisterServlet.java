package com.seminaire.auth;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");

        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String confirmPassword = request.getParameter("confirmPassword");
        String nom = request.getParameter("nom");

        if (username == null || email == null || password == null || confirmPassword == null || username.isEmpty() || email.isEmpty() || password.isEmpty()) {
            response.sendRedirect("register.html?error=Tous les champs sont obligatoires");
            return;
        }

        if (!password.equals(confirmPassword)) {
            response.sendRedirect("register.html?error=Les mots de passe ne correspondent pas");
            return;
        }

        if (nom == null || nom.isEmpty()) {
            nom = username;
        }

        String hashedPassword = PasswordUtils.hashPassword(password);
        String id = UUID.randomUUID().toString();

        try (Connection conn = DBConnection.getConnection()) {
            if (userExists(conn, username, email)) {
                response.sendRedirect("register.html?error=Nom d'utilisateur ou email déjà utilisé");
                return;
            }

            String sql = "INSERT INTO utilisateur (id, username, email, password, role, nom) VALUES (?, ?, ?, ?, ?, ?)";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, id);
                stmt.setString(2, username);
                stmt.setString(3, email);
                stmt.setString(4, hashedPassword);
                stmt.setString(5, "CITIZEN");
                stmt.setString(6, nom);
                stmt.executeUpdate();
            }

            String citoyenSql = "INSERT INTO citoyen (utilisateur_id, adresse, telephone) VALUES (?, NULL, NULL)";
            try (PreparedStatement stmt = conn.prepareStatement(citoyenSql)) {
                stmt.setString(1, id);
                stmt.executeUpdate();
            }

            response.sendRedirect("login.html?success=Inscription réussie, connectez-vous");
        } catch (SQLException e) {
            throw new ServletException("Erreur lors de l'inscription", e);
        }
    }

    private boolean userExists(Connection conn, String username, String email) throws SQLException {
        String sql = "SELECT id FROM utilisateur WHERE username = ? OR email = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, username);
            stmt.setString(2, email);
            try (ResultSet rs = stmt.executeQuery()) {
                return rs.next();
            }
        }
    }
}
