DROP DATABASE IF EXISTS huddle;
CREATE DATABASE huddle;

\c huddle;
-- MAKE ADMIN A NAME AND EMAIL WHO OWNS CHURCH ACCOUNT
 CREATE TABLE churches (
 	id SERIAL PRIMARY KEY,
 	name VARCHAR(100) NOT NULL,
	street VARCHAR(100),
	city VARCHAR(20),
	state VARCHAR(3),
	zip VARCHAR(5),
	latitude decimal NOT NULL,
 	longitude decimal NOT NULL,
 	adminFirstName VARCHAR(20) NOT NULL,
 	adminLastName VARCHAR(20) NOT NULL,
 	adminEmail VARCHAR(50) NOT NULL,
	dateCreated timestamp DEFAULT CURRENT_TIMESTAMP
 );

  INSERT INTO churches (name, adminFirstName, adminLastName, adminEmail, latitude, longitude)
  VALUES ('United Episcopal', 'Maggie', 'McCain', 'maggie@gmail.com', 33.7568, -84.3544);

  INSERT INTO churches (name, adminFirstName, adminLastName, adminEmail, latitude, longitude)
  VALUES ('Passion City Church', 'Clark', 'Kent', 'ck@church.org', 33.8172, 84.3712);

 CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	firstName VARCHAR(20) NOT NULL,
	lastName VARCHAR(20) NOT NULL,
	gender VARCHAR(1),
	dob DATE,
	adultStatus BOOLEAN,
	email VARCHAR(50) UNIQUE NOT NULL,
	phone INTEGER,
	street VARCHAR(100),
	city VARCHAR(20),
	state VARCHAR(20),
	-- zip INTEGER(5),
	bio VARCHAR(500),
	maritalStatus VARCHAR(50),
	church_id int,
	dateCreated timestamp DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (church_id) REFERENCES churches (ID)
 );

INSERT INTO users (firstName, lastName, email, church_id)
	VALUES ('Maggie', 'Jones', 'maggie.jones@gmail.com', 1);

INSERT INTO users (firstName, lastName, email, church_id)
	VALUES ('Carl', 'Harper', 'kharp@gmail.com', 1);

INSERT INTO users (firstName, lastName, email, church_id)
	VALUES ('Jilly', 'Nelson', 'nelson.j@hotmail.com', 2);

 CREATE TABLE gatherings (
 	-- id SERIAL PRIMARY KEY,
 	title VARCHAR(100) NOT NULL,
 	location VARCHAR(50),
	street VARCHAR(100),
	city VARCHAR(20),
	state VARCHAR(3),
 	latitude decimal NOT NULL,
 	longitude decimal NOT NULL,
	schedule VARCHAR(100),
	dateCreated timestamp DEFAULT CURRENT_TIMESTAMP,
	church_id int NOT NULL references churches(id) ON DELETE CASCADE,
	leader_id int NOT NULL references users(id),
	PRIMARY KEY (church_id, leader_id)
	-- FOREIGN KEY (church_id, leader_id) REFERENCES churches (id) users (id) ON DELETE CASCADE
 );

  INSERT INTO gatherings (title, latitude, longitude, church_id, leader_id)
  	VALUES ('Youth Group for Inman Park Methodist', 33.7568, -84.3544, 1, 1);

  INSERT INTO gatherings (title, latitude, longitude, church_id, leader_id)
  	VALUES ('Passion City Church Mission Team Meeting', 33.8172, -84.3712, 2, 3);

--  CREATE TABLE users_gatherings (
--   member_id int NOT NULL,
--   gathering_id int NOT NULL,
--   dateJoined timestamp DEFAULT CURRENT_TIMESTAMP,
--   dateDeparted timestamp,
--   -- PRIMARY KEY (member_id, gathering_id)
--   -- FOREIGN KEY (member_id) REFERENCES users(id) ON UPDATE CASCADE,
--   -- FOREIGN KEY (gathering_id) REFERENCES gatherings(id) ON UPDATE CASCADE
-- );
