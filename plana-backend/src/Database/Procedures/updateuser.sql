CREATE PROCEDURE spUpdateUser
    @UserID INT,
    @Username VARCHAR(50),
    @Email VARCHAR(100),
    @Role VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Users
    SET
        Username = @Username,
        Email = @Email,
        Role = @Role,
        UpdatedAt = GETDATE()
    WHERE
        UserID = @UserID;
END
