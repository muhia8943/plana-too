CREATE PROCEDURE spCreateTicket
    @EventID INT,
    @TicketType VARCHAR(50),
    @Price DECIMAL(10,2)
AS
BEGIN
    INSERT INTO Tickets (EventID, TicketType, Price)
    VALUES (@EventID, @TicketType, @Price);
    SELECT * FROM Tickets WHERE TicketID = SCOPE_IDENTITY();
END
