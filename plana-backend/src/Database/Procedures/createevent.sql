CREATE PROCEDURE spCreateEvent
    @Title NVARCHAR(100),
    @Category NVARCHAR(50),
    @Description TEXT,
    @Date DATETIME,
    @Time DATETIME,
    @Location NVARCHAR(255),
    @Price DECIMAL(10, 2),
    @EventImage NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Events (Title, Category, Description, Date, Time, Location, Price, EventImage, CreatedAt, UpdatedAt)
    VALUES (@Title, @Category, @Description, @Date, @Time, @Location, @Price, @EventImage, GETDATE(), GETDATE());
END
