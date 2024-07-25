CREATE PROCEDURE spDeactivateUser
    @id INT
AS
BEGIN
    UPDATE Users
    SET isActive = 0
    WHERE id = @id;
END;
GO