CREATE PROCEDURE spActivateUser
    @id INT
AS
BEGIN
    UPDATE Users
    SET isActive = 1
    WHERE id = @id;
END;
GO