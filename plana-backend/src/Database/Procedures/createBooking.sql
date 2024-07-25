CREATE PROCEDURE spCreateBooking
    @UserID INT,
    @TicketID INT
AS
BEGIN
    INSERT INTO Bookings (UserID, TicketID)
    VALUES (@UserID, @TicketID);
    SELECT * FROM Bookings WHERE BookingID = SCOPE_IDENTITY();
END
