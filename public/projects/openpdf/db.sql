CREATE DATABASE pdf_website_feeback;

USE pdf_website_feeback;

CREATE TABLE customer (
    name VARCHAR(100) NOT NULL PRIMARY KEY,
    email VARCHAR(150) NOT NULL,
    message TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);