-- יצירת מסד נתונים
CREATE DATABASE IF NOT EXISTS flight;
USE flight;
-- Drop the dependent tables first
-- Drop the dependent tables first
DROP TABLE IF EXISTS passenger_requests;
DROP TABLE IF EXISTS Passwords;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS canceled_flights;
DROP TABLE IF EXISTS Places;
DROP TABLE IF EXISTS Flights;
DROP TABLE IF EXISTS Airplanes;
DROP TABLE IF EXISTS Company_employees;
DROP TABLE IF EXISTS Companies;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS user_flights;



CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(255)
);

-- יצירת טבלת משתמשים
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    userName VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    roleId INT,
        FOREIGN KEY (roleId) REFERENCES roles(id)
);
CREATE TABLE Companies (
    name VARCHAR(255)  PRIMARY KEY
);
CREATE TABLE  Company_employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    company  VARCHAR(255),
    FOREIGN KEY (employee_id) REFERENCES Users(id),
    FOREIGN KEY (company) REFERENCES Companies(name)
);

-- יצירת טבלת סיסמאות
CREATE TABLE Passwords (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);


CREATE TABLE Airplanes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company  VARCHAR(255),
    num_places INT,
    num_rows INT,
     num_columns INT,
FOREIGN KEY (company) REFERENCES Companies(name)
);
CREATE TABLE Places (
    id INT AUTO_INCREMENT PRIMARY KEY,
    airplane_id INT,
    rowP INT,
    columnP INT,
    isAvailable BOOL,
    FOREIGN KEY (airplane_id) REFERENCES Airplanes(id)
);
-- יצירת טבלת טיסות
CREATE TABLE Flights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company  VARCHAR(255),
    airplain_id INT,
    exitP VARCHAR(255),
    flightCode VARCHAR(255),
    price INT,
    target VARCHAR(255),
    departureDate Date,
    arrivalDate Date,
    departureTime time,
    arrivalTime time,
    active bool,
    image VARCHAR(255),
FOREIGN KEY (company) REFERENCES Companies(name),
FOREIGN KEY (airplain_id) REFERENCES Airplanes(id)
);


-- יצירת טבלת משתמשים-טיסות
CREATE TABLE Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    flight_id INT,
    place_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (flight_id) REFERENCES Flights(id),
    FOREIGN KEY (place_id) REFERENCES Places(id)
);

CREATE TABLE canceled_flights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    flight_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (flight_id) REFERENCES Flights(id)
);
-- יצירת טבלת בקשות נוסע
CREATE TABLE passenger_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    favorite_someone_first_name VARCHAR(255),
    favorite_someone_last_name VARCHAR(255),
    preffered VARCHAR(255),
    FOREIGN KEY (id) REFERENCES Orders(id)
);
INSERT INTO roles (role)
VALUES
('manager'),
('Company employee '),
('user');


INSERT INTO Users (firstName, lastName, userName, email, phone, roleId )
VALUES
('John', 'Doe', 'john_doe', 'john@example.com', '123456789', 1),
('Alice', 'Smith', 'alice_smith', 'alice@example.com', '987654321', 2),
('Michael', 'Johnson', 'michael_johnson', 'michael@example.com', '555555555', 2),
('Emily', 'Brown', 'emily_brown', 'emily@example.com', '666666666', 2),
('David', 'Martinez', 'david_martinez', 'david@example.com', '777777777', 2),
('Emma', 'Wilson', 'emma_wilson', 'emma@example.com', '888888888', 3),
('Sophia', 'Taylor', 'sophia_taylor', 'sophia@example.com', '999999999', 3),
('Daniel', 'Anderson', 'daniel_anderson', 'daniel@example.com', '111111111', 3),
('Olivia', 'Thomas', 'olivia_thomas', 'olivia@example.com', '222222222', 3),
('James', 'Jackson', 'james_jackson', 'james@example.com', '333333333', 3);



INSERT INTO Passwords (user_id, password)
VALUES
(1, '$2b$10$8.xGWX72kxYTOEXDispypOYRa8k3yM8GtWIkYbzVbYhwFLzPb.PL2'),
(2, '$2b$10$8.xGWX72kxYTOEXDispypOYRa8k3yM8GtWIkYbzVbYhwFLzPb.PL2'),
(3, '$2b$10$8.xGWX72kxYTOEXDispypOYRa8k3yM8GtWIkYbzVbYhwFLzPb.PL2'),
(4, '$2b$10$8.xGWX72kxYTOEXDispypOYRa8k3yM8GtWIkYbzVbYhwFLzPb.PL2'),
(5, '$2b$10$8.xGWX72kxYTOEXDispypOYRa8k3yM8GtWIkYbzVbYhwFLzPb.PL2'),
(6, '$2b$10$8.xGWX72kxYTOEXDispypOYRa8k3yM8GtWIkYbzVbYhwFLzPb.PL2'),
(7, '$2b$10$8.xGWX72kxYTOEXDispypOYRa8k3yM8GtWIkYbzVbYhwFLzPb.PL2'),
(8, '$2b$10$8.xGWX72kxYTOEXDispypOYRa8k3yM8GtWIkYbzVbYhwFLzPb.PL2'),
(9, '$2b$10$8.xGWX72kxYTOEXDispypOYRa8k3yM8GtWIkYbzVbYhwFLzPb.PL2'),
(10, '$2b$10$8.xGWX72kxYTOEXDispypOYRa8k3yM8GtWIkYbzVbYhwFLzPb.PL2');
INSERT INTO Companies (name)
VALUES
('Company A'),
('Company B'),
('Company C'),
('Company D'),
('Company J');
INSERT INTO Airplanes (company, num_places, num_rows, num_columns)
VALUES
("Company A", 10, 5, 2),
("Company C", 6, 3, 2),
("Company A", 8, 4, 2),
("Company C", 12, 6, 2),
("Company C", 15, 5, 3),
("Company A", 16, 8, 2),
("Company C", 16, 8, 2),
("Company A", 16, 8, 2),
("Company C", 16, 8, 2),
("Company A", 16, 8, 2),
("Company A", 16, 8, 2),
("Company A", 16, 8, 2)
;
-- Insert data into Companies table


INSERT INTO Places (airplane_id, rowP, columnP, isAvailable)
VALUES
(1, 1, 1, true),
(1, 1, 2, true),
(1, 2, 1, true),
(1, 2, 2, false),
(1, 3, 1, true),
(1, 3, 2, false),
(1, 4, 1, true),
(1, 4, 2, false),
(1, 5, 1, true),
(1, 5, 2, false),

(2, 1, 1, true),
(2, 1, 2, true),
(2, 2, 1, true),
(2, 2, 2, false),
(2, 3, 1, true),
(2, 3, 2, false),


(3, 1, 1, true),
(3, 1, 2, true),
(3, 2, 1, true),
(3, 2, 2, false),
(3, 3, 1, true),
(3, 3, 2, false),
(3, 4, 1, true),
(3, 4, 2, false),

(4, 1, 1, true),
(4, 1, 2, true),
(4, 2, 1, true),
(4, 2, 2, false),
(4, 3, 1, true),
(4, 3, 2, false),
(4, 4, 1, true),
(4, 4, 2, false),
(4, 5, 1, true),
(4, 5, 2, false),
(4, 6, 1, true),
(4, 6, 2, false)
,
(5, 1, 1, true),
(5, 1, 2, true),
(5, 1, 3, true),
(5, 2, 1, true),
(5, 2, 2, true),
(5, 2, 3, false),
(5, 3, 1, true),
(5, 3, 2, false),
(5, 3, 3, true),
(5, 4, 1, false),
(5, 4, 2, true),
(5, 4, 3, false),
(5, 5, 1, true),
(5, 5, 2, true),
(5, 5, 3, true),

(6, 1, 1, true),
(6, 1, 2, true),
(6, 2, 1, true),
(6, 2, 2, false),
(6, 3, 1, true),
(6, 3, 2, false),
(6, 4, 1, true),
(6, 4, 2, false),
(6, 5, 1, true),
(6, 5, 2, false),
(6, 6, 1, true),
(6, 6, 2, false)
,(6, 7, 1, true),
(6, 7, 2, false)
,(6, 8, 1, true),
(6, 8, 2, false)
,

(7, 1, 1, true),
(7, 1, 2, true),
(7, 2, 1, true),
(7, 2, 2, false),
(7, 3, 1, true),
(7, 3, 2, false),
(7, 4, 1, true),
(7, 4, 2, false),
(7, 5, 1, true),
(7, 5, 2, false),
(7, 6, 1, true),
(7, 6, 2, false)
,(7, 7, 1, true),
(7, 7, 2, false)
,(7, 8, 1, true),
(7, 8, 2, false)
,
(8, 1, 1, true),
(8, 1, 2, true),
(8, 2, 1, true),
(8, 2, 2, false),
(8, 3, 1, true),
(8, 3, 2, false),
(8, 4, 1, true),
(8, 4, 2, false),
(8, 5, 1, true),
(8, 5, 2, false),
(8, 6, 1, true),
(8, 6, 2, false)
,(8, 7, 1, true),
(8, 7, 2, false)
,(8, 8, 1, true),
(8, 8, 2, false)

,
(9, 1, 1, true),
(9, 1, 2, true),
(9, 2, 1, true),
(9, 2, 2, false),
(9, 3, 1, true),
(9, 3, 2, false),
(9, 4, 1, true),
(9, 4, 2, false),
(9, 5, 1, true),
(9, 5, 2, false),
(9, 6, 1, true),
(9, 6, 2, false)
,(9, 7, 1, true),
(9, 7, 2, false)
,(9, 8, 1, true),
(9, 8, 2, false)
,


(10, 1, 1, true),
(10, 1, 2, true),
(10, 2, 1, true),
(10, 2, 2, false),
(10, 3, 1, true),
(10, 3, 2, false),
(10, 4, 1, true),
(10, 4, 2, false),
(10, 5, 1, true),
(10, 5, 2, false),
(10, 6, 1, true),
(10, 6, 2, false)
,(10, 7, 1, true),
(10, 7, 2, false)
,(10, 8, 1, true),
(10, 8, 2, false)
,

(11, 1, 1, true),
(11, 1, 2, true),
(11, 2, 1, true),
(11, 2, 2, false),
(11, 3, 1, true),
(11, 3, 2, false),
(11, 4, 1, true),
(11, 4, 2, false),
(11, 5, 1, true),
(11, 5, 2, false),
(11, 6, 1, true),
(11, 6, 2, false)
,(11, 7, 1, true),
(11, 7, 2, false)
,(11, 8, 1, true),
(11, 8, 2, false)
,

(12, 1, 1, true),
(12, 1, 2, true),
(12, 2, 1, true),
(12, 2, 2, false),
(12, 3, 1, true),
(12, 3, 2, false),
(12, 4, 1, true),
(12, 4, 2, false),
(12, 5, 1, true),
(12, 5, 2, false),
(12, 6, 1, true),
(12, 6, 2, false)
,(12, 7, 1, true),
(12, 7, 2, false)
,(12, 8, 1, true),
(12, 8, 2, false)
;

INSERT INTO Flights (company, airplain_id, exitP, flightCode, price, target, departureDate, arrivalDate, departureTime, arrivalTime,active,image)
VALUES
("Company B", 5, 'New York', 1001, 800, 'Los Angeles', '2028-06-10', '2028-06-10', '08:00:00', '10:30:00',1,"los.jpg"),
("Company C", 6, 'Los Angeles', 1002, 250, 'Paris', '2028-06-10', '2028-06-15', '10:50:00', '12:30:00',1,"paris.jpg"),
("Company B", 1, 'New York', 1001, 200, 'a', '2022-06-10', '2022-06-10', '08:00:00', '10:30:00',1,"los.jpg"),
("Company C", 2, 'a', 1002, 250, 'Paris', '2024-06-10', '2024-06-15', '10:50:00', '12:30:00',1,"paris.jpg"),
("Company C", 3, 'Tokyo', 1003, 300, 'Beijing', '2024-06-20', '2024-06-20', '12:00:00', '14:30:00',1,"Singapore.jpg"),
("Company C", 4, 'Dubai', 1004, 400, 'Singapore', '2024-06-25', '2024-06-26', '14:00:00', '16:30:00',1,"Seoul.jpg"),
("Company C", 7, 'Sydney', 1005, 350, 'Melbourne', '2024-06-30', '2024-06-30', '16:00:00', '18:30:00',1,"newyork.jpg"),
("Company B", 8, 'Hong Kong', 1006, 380, 'Seoul', '2024-07-05', '2024-07-07', '18:00:00', '20:30:00',1,"Melbourne.jpg"),
("Company C", 9, 'Berlin', 1007, 280, 'Rome', '2024-07-10', '2024-07-11', '20:00:00', '22:30:00',1,"Berlin.jpg"),
("Company A", 10, 'Madrid', 1008, 320, 'Barcelona', '2024-07-15', '2024-07-15', '22:00:00', '00:30:00',1,"Madrid.jpg"),
("Company A", 11, 'Rio de Janeiro', 1009, 450, 'Sao Paulo', '2024-07-20', '2024-07-23', '00:00:00', '02:30:00',1,"Rio de.jpg"),
("Company C", 12, 'Moscow', 1010, 270, 'Saint Petersburg', '2024-07-25', '2024-07-25', '02:00:00', '04:30:00',1,"Moscow.jpg");

-- INSERT INTO Orders (user_id, flight_id, place_id)
-- VALUES
-- (1, 1, 1);

-- INSERT INTO canceled_flights (user_id, flight_id)
-- VALUES
-- (1, 1);
INSERT INTO Company_employees (employee_id, company)
VALUES
(1, "Company C"),
(3, "Company B"),
(4, "Company C"),
(5, "Company A");

