package com.seminaire.auth;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = {"/citizen/*", "/agent/*", "/admin/*"})
public class FrontendServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Forward all SPA routes to the frontend index.html located at the webapp root
        req.getRequestDispatcher("/index.html").forward(req, resp);
    }
}
