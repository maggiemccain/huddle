-- DROP DATABASE IF EXISTS puppies;
-- CREATE DATABASE puppies;

-- \c puppies;

-- CREATE TABLE pups (
--   ID SERIAL PRIMARY KEY,
--   name VARCHAR,
--   breed VARCHAR,
--   age INTEGER,
--   sex VARCHAR
-- );

-- INSERT INTO pups (name, breed, age, sex)
--   VALUES ('Tyler', 'Retrieved', 3, 'M');


DROP DATABASE IF EXISTS huddle;
CREATE DATABASE huddle;

\c huddle;

 CREATE TABLE users (
	id SERIAL,
	firstName VARCHAR(20) NOT NULL,
	lastName VARCHAR(20) NOT NULL,
	gender VARCHAR(1),
	dob DATE,
	adultStatus BOOLEAN,
	email VARCHAR(50) NOT NULL,
	phone INTEGER,
	street VARCHAR(100),
	city VARCHAR(20),
	state VARCHAR(3),
	bio VARCHAR(500),
	maritalStatus VARCHAR(50),
	church VARCHAR(100),
	dateCreated timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
 );

INSERT INTO users (firstName, lastName, email, phone)
	VALUES ('Maggie', 'Jones', 'maggie.jones@gmail.com', 61);

INSERT INTO users (firstName, lastName, email, phone)
	VALUES ('Carl', 'Harper', 'kharp@gmail.com', 22);

INSERT INTO users (firstName, lastName, email, phone)
	VALUES ('Jilly', 'Nelson', 'nelson.j@hotmail.com', 10);

 CREATE TABLE churches (
 	id SERIAL,
 	name VARCHAR(100) NOT NULL,
	street VARCHAR(100),
	city VARCHAR(20),
	state VARCHAR(3),
	admin_id int NOT NULL,
	dateCreated timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (admin_id) REFERENCES users(id)
 );

  -- INSERT INTO churches (name, admin_id)
  -- VALUES ('United Episcopal', 1);

 CREATE TABLE gatherings (
 	id SERIAL,
 	title VARCHAR(100) NOT NULL,
 	location VARCHAR(50),
	street VARCHAR(100),
	city VARCHAR(20),
	state VARCHAR(3),
	schedule VARCHAR(100) NOT NULL,
	leader_id int NOT NULL,
	church_id int NOT NULL,
	dateCreated timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (church_id) REFERENCES churches(id) ON DELETE CASCADE,
	FOREIGN KEY (leader_id) REFERENCES users(id)
 );

  -- INSERT INTO gatherings (title, schedule, leader_id, church_id)
  -- VALUES ('Maggie', 'Jones', 'maggie.jones@gmail.com', 6157140000);

 CREATE TABLE users_gatherings (
  member_id int NOT NULL,
  gathering_id int NOT NULL,
  dateJoined timestamp DEFAULT CURRENT_TIMESTAMP,
  dateDeparted timestamp,
  PRIMARY KEY (member_id, gathering_id),
  FOREIGN KEY (member_id) REFERENCES users(id) ON UPDATE CASCADE,
  FOREIGN KEY (gathering_id) REFERENCES gatherings(id) ON UPDATE CASCADE
);
