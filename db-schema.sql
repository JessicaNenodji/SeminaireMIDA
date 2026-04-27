-- Script SQL pour créer les tables d'authentification de Sprint 2

CREATE DATABASE IF NOT EXISTS seminaireMIDA CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE seminaireMIDA;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(150) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
