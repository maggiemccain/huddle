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
	email VARCHAR(50) UNIQUE NOT NULL,
	phone INTEGER,
	street VARCHAR(100),
	city VARCHAR(20),
	state VARCHAR(3),
	-- zip INTEGER(5),
	bio VARCHAR(500),
	maritalStatus VARCHAR(50),
	church VARCHAR(100),
	dateCreated timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
 );

-- INSERT INTO users (firstName, lastName, email, phone)
-- 	VALUES ('Maggie', 'Jones', 'maggie.jones@gmail.com', 61);

-- INSERT INTO users (firstName, lastName, email, phone)
-- 	VALUES ('Carl', 'Harper', 'kharp@gmail.com', 22);

-- INSERT INTO users (firstName, lastName, email, phone)
-- 	VALUES ('Jilly', 'Nelson', 'nelson.j@hotmail.com', 10);

 CREATE TABLE churches (
 	id SERIAL,
 	name VARCHAR(100) NOT NULL,
	street VARCHAR(100),
	city VARCHAR(20),
	state VARCHAR(3),
	latitude decimal NOT NULL,
 	longitude decimal NOT NULL,
	admin_id int NOT NULL,
	dateCreated timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
	-- FOREIGN KEY (admin_id) REFERENCES users(id)
 );

  -- INSERT INTO churches (name, latitude, longitude, admin_id)
  -- VALUES ('United Episcopal', 33.7568, -84.3544, 1);

 CREATE TABLE gatherings (
 	id SERIAL,
 	title VARCHAR(100) NOT NULL,
 	location VARCHAR(50),
	street VARCHAR(100),
	city VARCHAR(20),
	state VARCHAR(3),
 	latitude decimal NOT NULL,
 	longitude decimal NOT NULL,
	schedule VARCHAR(100),
	leader_id int,
	church_id int,
	dateCreated timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
	-- FOREIGN KEY (church_id) REFERENCES churches(id) ON DELETE CASCADE,
	-- FOREIGN KEY (leader_id) REFERENCES users(id)
 );

  INSERT INTO gatherings (title, latitude, longitude)
  	VALUES ('Youth Group for Inman Park Methodist', 33.7568, -84.3544);

  INSERT INTO gatherings (title, latitude, longitude)
  	VALUES ('Passion City Church Mission Team Meeting', 33.8172, -84.3712);

 CREATE TABLE users_gatherings (
  member_id int NOT NULL,
  gathering_id int NOT NULL,
  dateJoined timestamp DEFAULT CURRENT_TIMESTAMP,
  dateDeparted timestamp,
  PRIMARY KEY (member_id, gathering_id)
  -- FOREIGN KEY (member_id) REFERENCES users(id) ON UPDATE CASCADE,
  -- FOREIGN KEY (gathering_id) REFERENCES gatherings(id) ON UPDATE CASCADE
);
