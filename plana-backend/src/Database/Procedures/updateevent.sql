CREATE PROCEDURE spUpdateEvent
    @EventID INT,
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

    UPDATE Events
    SET Title = @Title,
        Category = @Category,
        Description = @Description,
        Date = @Date,
        Time = @Time,
        Location = @Location,
        Price = @Price,
        EventImage = @EventImage,
        UpdatedAt = GETDATE()
    WHERE EventID = @EventID;
END
