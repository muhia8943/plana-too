CREATE PROCEDURE spRegisterUser
    @username NVARCHAR(50),
    @password NVARCHAR(255),
    @email NVARCHAR(100),
    @role NVARCHAR(20) = 'user'
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the username already exists
    IF EXISTS (SELECT 1 FROM Users WHERE Username = @username)
    BEGIN
        RAISERROR('Username already exists', 16, 1);
        RETURN;
    END

    -- Check if the email already exists
    IF EXISTS (SELECT 1 FROM Users WHERE Email = @email)
    BEGIN
        RAISERROR('Email already exists', 16, 1);
        RETURN;
    END

    -- Insert the new user into the Users table
    INSERT INTO Users (Username, PasswordHash, Email, Role, CreatedAt, UpdatedAt)
    VALUES (@username, @password, @email, @role, GETDATE(), GETDATE());
END
