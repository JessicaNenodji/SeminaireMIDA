package com.seminaire.auth;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        if (username == null || password == null || username.isEmpty() || password.isEmpty()) {
            response.sendRedirect("login.html?error=Veuillez remplir tous les champs");
            return;
        }

        String hashedPassword = PasswordUtils.hashPassword(password);
        try (Connection conn = DBConnection.getConnection()) {
            User user = authenticate(conn, username, hashedPassword);
            if (user == null) {
                response.sendRedirect("login.html?error=Identifiants incorrects");
                return;
            }

            HttpSession session = request.getSession();
            session.setAttribute("user", user);
            response.sendRedirect("home");
        } catch (SQLException e) {
            throw new ServletException("Erreur lors de la connexion", e);
        }
    }

    private User authenticate(Connection conn, String username, String password) throws SQLException {
        String sql = "SELECT id, username, email, role, nom FROM utilisateur WHERE username = ? AND password = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, username);
            stmt.setString(2, password);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    User user = new User();
                    user.setId(rs.getString("id"));
                    user.setUsername(rs.getString("username"));
                    user.setEmail(rs.getString("email"));
                    user.setRole(rs.getString("role"));
                    user.setNom(rs.getString("nom"));
                    return user;
                }
            }
        }
        return null;
    }
}
