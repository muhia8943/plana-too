import { Request, Response } from 'express';
import { BookingService } from '../services/bookings.service';

const bookingService = new BookingService();

export const createBooking = async (req: Request, res: Response) => {
    try {
        const booking = await bookingService.createBooking(req.body);
        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error: any) {
        res.status(500).json({ error: 'Booking error', details: error.message });
    }
};

export const getAllBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await bookingService.getAllBookings();
        res.json(bookings);
    } catch (error: any) {
        res.status(500).json({ error: 'get Booking error', details: error.message });
    }
};

export const getBookingById = async (req: Request, res: Response) => {
    try {
        const booking = await bookingService.getBookingById(Number(req.params.id));
        if (booking) {
            res.json(booking);
        } else {
            res.status(404).json({ error: 'Booking not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: 'get Booking error', details: error.message });
    }
};

export const deleteBooking = async (req: Request, res: Response) => {
    try {
        await bookingService.deleteBooking(Number(req.params.id));
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: 'delete Booking error', details: error.message });
    }
};

export const getBookingsByUserId = async (req: Request, res: Response) => {
    try {
        const bookings = await bookingService.getBookingsByUserId(Number(req.params.userId));
        if (bookings.length > 0) {
            res.json(bookings);
        } else {
            res.status(404).json({ error: 'No bookings found for this user' });
        }
    } catch (error: any) {
        res.status(500).json({ error: 'get Bookings by UserID error', details: error.message });
    }
};
