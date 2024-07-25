CREATE TABLE Tickets (
    TicketID INT IDENTITY(1,1) PRIMARY KEY,
    EventID INT NOT NULL FOREIGN KEY REFERENCES Events(EventID),
    TicketType VARCHAR(50) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
);
DROP TABLE Tickets;
