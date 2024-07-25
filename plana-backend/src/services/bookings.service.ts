import { poolPromise } from "../config/sql.config";
import { bookings } from "../interfaces/bookings.interface";
import * as sql from 'mssql';
import { sendMail } from "../helpers/emailHelpers";

export class BookingService {
    public async createBooking(booking: bookings): Promise<void> {
        const pool = await poolPromise;
        const result = await pool.request()
           .input('userID', sql.Int, booking.userID)
           .input('ticketID', sql.Int, booking.ticketID)
           .execute('spCreateBooking');

           const newBooking = result.recordset[0];

           // Get user email to send confirmation
           const userResult = await pool.request()
               .input('UserID', sql.Int, booking.userID)
               .query('SELECT Email FROM Users WHERE UserID = @UserID');
           
           const userEmail = userResult.recordset[0].Email;
   
           // Prepare the email content
           const messageOption = {
               from: process.env.EMAIL_USER,
               to: userEmail,
               subject: 'Booking Confirmation',
               text: `Your booking was successful. Here are the details:\n\nBooking ID: ${newBooking.BookingID}\nEvent ID: ${newBooking.EventID}\nUser ID: ${newBooking.UserID}\nTicket ID: ${newBooking.TicketID}`
           };
   
           // Send confirmation email
           await sendMail(messageOption);
   
           return newBooking;
    
}

    public async deleteBooking(bookingID: number): Promise<void> {
        const pool = await poolPromise;
        await pool.request()
           .input('bookingID', sql.Int, bookingID)
           .execute('spDeleteBooking');
    }
    public async getAllBookings(): Promise<bookings[]> {
        const pool = await poolPromise;
        const result = await pool.request()
           .query('SELECT * FROM Bookings');
        return result.recordset;
    }
    public async getBookingById(bookingID: number): Promise<bookings> {
        const pool = await poolPromise;
        const result = await pool.request()
           .input('BookingID', sql.Int, bookingID)
           .query('SELECT * FROM Bookings WHERE BookingID = @BookingID');
        return result.recordset[0];
    
}
public async getBookingsByUserId(userID: number): Promise<bookings[]> {
    const pool = await poolPromise;
    const result = await pool.request()
       .input('UserID', sql.Int, userID)
       .query('SELECT * FROM Bookings WHERE UserID = @UserID');
    return result.recordset;
}
}