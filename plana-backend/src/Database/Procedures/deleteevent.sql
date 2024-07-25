CREATE PROCEDURE spDeleteEvent
    @EventID INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Events
    WHERE EventID = @EventID;

    IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR('Event not found', 16, 1);
    END
END
