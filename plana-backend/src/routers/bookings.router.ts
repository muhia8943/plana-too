import { Router } from "express";
import { createBooking, deleteBooking, getAllBookings, getBookingById, getBookingsByUserId} from "../controllers/bookings.controller";

const router = Router();

router.post('/bookings', createBooking);

router.delete('/bookings/:id', deleteBooking);

router.get('/bookings', getAllBookings);

router.get('/bookings/:id', getBookingById);

router.get('/bookings/user/:userId', getBookingsByUserId);

export default router;