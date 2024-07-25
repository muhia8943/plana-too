import { Request, Response } from 'express';
import { TicketService } from '../services/tickets.service';

const ticketService = new TicketService();

export const createTicket = async (req: Request, res: Response) => {
    try {
        const ticket = await ticketService.createTicket(req.body);
        res.status(201).json(ticket);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateTicket = async (req: Request, res: Response) => {
    try {
        const ticket = await ticketService.updateTicket(Number(req.params.id), req.body);
        if (ticket) {
            res.status(200).json(ticket);
        } else {
            res.status(404).json({ error: 'Ticket not found' });
        }
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteTicket = async (req: Request, res: Response) => {
    try {
        const success = await ticketService.deleteTicket(Number(req.params.id));
        if (success) {
            res.status(200).json({ message: 'Ticket deleted successfully' });
        } else {
            res.status(404).json({ error: 'Ticket not found' });
        }
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};
export const getAllTickets = async (req: Request, res: Response) => {
    try {
        const tickets = await ticketService.getAllTickets();
        res.status(200).json(tickets);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

export const getTicketById = async (req: Request, res: Response) => {
    try {
        const ticket = await ticketService.getTicketById(Number(req.params.id));
        if (ticket) {
            res.status(200).json(ticket);
        } else {
            res.status(404).json({ error: 'Ticket not found' });
        }
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};
export const getTicketsByEventId = async (req: Request, res: Response) => {
    try {
        const tickets = await ticketService.getTicketsByEventId(Number(req.params.eventId));
        if (tickets.length > 0) {
            res.status(200).json(tickets);
        } else {
            res.status(404).json({ error: 'No tickets found for this event' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
