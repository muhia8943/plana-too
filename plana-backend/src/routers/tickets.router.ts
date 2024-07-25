import { Router } from 'express';
import { createTicket, updateTicket, deleteTicket, getTicketById, getAllTickets, getTicketsByEventId } from '../controllers/tickets.controller';

const router = Router();

router.post('/tickets', createTicket);
router.put('/tickets/:id', updateTicket);
router.delete('/tickets/:id', deleteTicket);
router.get('/tickets', getAllTickets);
router.get('/tickets/:id', getTicketById);
router.get('/tickets/event/:eventId', getTicketsByEventId);
export default router;
