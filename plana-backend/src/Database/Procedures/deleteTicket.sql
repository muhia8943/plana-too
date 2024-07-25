CREATE PROCEDURE spDeleteTicket
    @TicketID INT
AS
BEGIN
    DELETE FROM Tickets WHERE TicketID = @TicketID;
END
