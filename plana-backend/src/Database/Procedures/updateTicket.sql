CREATE PROCEDURE spUpdateTicket
    @TicketID INT,
    @EventID INT,
    @TicketType VARCHAR(50),
    @Price DECIMAL(10,2)
AS
BEGIN
    UPDATE Tickets
    SET EventID = @EventID, TicketType = @TicketType, Price = @Price
    WHERE TicketID = @TicketID;
    SELECT * FROM Tickets WHERE TicketID = @TicketID;
END
