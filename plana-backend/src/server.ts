import express from 'express';
import userRouter from './routers/user.router';
import eventRouter from './routers/events.router';
import ticketRouter from './routers/tickets.router'; 
import bookingRouter from './routers/bookings.router';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:4200' // Allow only this origin
}));

app.use(express.json());
app.use('/api/auth', userRouter);
app.use('/api', eventRouter);
app.use('/api', ticketRouter);
app.use('/api', bookingRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
