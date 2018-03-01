CREATE TABLE Admin_user (
	UserID int NOT NULL AUTO_INCREMENT,
	CompanyID int,
	Email varchar(255),
	Password varchar(255),
	PRIMARY KEY(UserID)
); 

CREATE TABLE Users (
	UserID int NOT NULL AUTO_INCREMENT,
	CompanyID int,
	CarID int,
	Address varchar(255) NOT NULL,
	Fname varchar(255) NOT NULL,
	Lname varchar(255) NOT NULL,
	FuelDay int,
	FuelTime TIME,
	FuelNotification BIT DEFAULT 0,
	PRIMARY KEY (UserID)
);

CREATE TABLE Registered_fuel_refill(
	RefillID int NOT NULL AUTO_INCREMENT, 
	UserID int, 
	Timestamp TIMESTAMP DEFAULT NOW(),
	FuelTime Time,
	Refueled BIT DEFAULT 0,
	PRIMARY KEY (RefillID)
);

CREATE TABLE Cars (
	CarID int AUTO_INCREMENT PRIMARY KEY,
	Cas varchar(255),
	RegNr varchar(255),
	Brand varchar(255),
	Model varchar(255),
	RegYear int,
	FuelType varchar(255),
	VehicleGroup varchar(255),
	Co2Emission FLOAT,
	NoxEmission FLOAT,
	FuelConsumption FLOAT,
	ParticleEmmision FLOAT,
	ParticleFilter FLOAT,
	NextVI DATE,
	NextVINotification BIT DEFAULT 0,
	InsuranceCompany varchar(128)
);

CREATE TABLE Company (
	CompanyID int NOT NULL AUTO_INCREMENT,
	CompanyName varchar(255),
	PRIMARY KEY(CompanyID)
);

CREATE TABLE Driving_log (
	LogID int NOT NULL AUTO_INCREMENT,
	UserID int, 
	CarID int, 
	Km int, 
	Date DATE,
	LocationFrom varchar(255),
	LocationTo varchar(255),
	ParkingTicketImg varchar(255),
	Cargo BIT, 
	NoOfPassengers int,
	PassengerNames varchar(255),
	Objective varchar(255),
	PRIMARY KEY (LogID)
);

CREATE TABLE Driving_rates (
	RateID int NOT NULL AUTO_INCREMENT,
	Year int NOT NULL,
	KmRate FLOAT NOT NULL,
	CargoRate FLOAT NOT NULL,Admin_user
	PassengerRate FLOAT NOT NULL,
	PRIMARY KEY (RateID)
);




