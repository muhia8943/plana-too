import { Request, Response } from 'express';
import { EventService } from '../services/events.service';

const eventService = new EventService();

export const createEvent = async (req: Request, res: Response) => {
    try {
        await eventService.createEvent(req.body);
        res.status(201).json({ message: 'Event created successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'EVENT NOT CREATED', error: error.message });
    }
};

export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const events = await eventService.getAllEvents();
        res.json(events);
    } catch (error: any) {
        res.status(500).json({ message: 'Cant get events', error: error.message });
    }
};

export const getEventById = async (req: Request, res: Response) => {
    try {
        const event = await eventService.getEventById(Number(req.params.id));
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'cant find event', error: error.message });
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    try {
        await eventService.updateEvent(Number(req.params.id), req.body);
        res.status(200).json({ message: 'Event updated successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'event update failed', error: error.message });
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        await eventService.deleteEvent(Number(req.params.id));
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'event not deleted', error: error.message });
    }
};
