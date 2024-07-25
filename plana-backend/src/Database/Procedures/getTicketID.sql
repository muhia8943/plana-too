CREATE PROCEDURE spGetTicketById
    @TicketID INT
AS
BEGIN
    SELECT * FROM Tickets WHERE TicketID = @TicketID;
END
