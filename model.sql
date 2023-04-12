CREATE DATABASE DARS9;

CREATE TYPE user_role AS ENUM('manager', 'superadmin', 'user');

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY NOT NULL,
    user_name VARCHAR(90) NOT NULL,
    user_username VARCHAR(90) NOT NULL UNIQUE,
    user_password TEXT NOT NULL,
    user_role user_role default 'user' NOT NULL,
    user_created_at TIMESTAMP default CURRENT_TIMESTAMP,
    user_updated_at TIMESTAMP default null
);

INSERT INTO users(user_name, user_username, user_password, user_role)
values(
    'kimdir', 'birinchi', '$2a$12$3rjU1/C90CqO1hQnXcrV8e44imkc6094La.1d114zy9JVZM18iGk6', 'superadmin'
);


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    user_role VARCHAR(30),
    password INteger
);
 
 INSERT INTO users(id, username, user_role, password) values(1, 'soliha', 'admin', 1222);

 
 INSERT INTO users(id, username, user_role, password) values(2, 'muslima', 'user', 1222);