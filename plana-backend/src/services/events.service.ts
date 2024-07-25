import { poolPromise } from '../config/sql.config';
import { events } from '../interfaces/events.interface';
import * as sql from 'mssql';

export class EventService {
    public async createEvent(event: events): Promise<void> {
        const pool = await poolPromise;
        await pool.request()
            .input('Title', sql.NVarChar, event.Title)
            .input('Category', sql.NVarChar, event.Category)
            .input('Description', sql.Text, event.Description)
            .input('Date', sql.DateTime, event.Date)
            .input('Time', sql.DateTime, event.Time)
            .input('Location', sql.NVarChar, event.Location)
            .input('Price', sql.Decimal, event.Price)
            .input('EventImage', sql.NVarChar, event.EventImage)
            .execute('spCreateEvent');
    }

    public async getAllEvents(): Promise<Event[]> {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Events');
        return result.recordset;
    }

    public async getEventById(eventId: number): Promise<Event> {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('EventID', sql.Int, eventId)
            .query('SELECT * FROM Events WHERE EventID = @EventID');
        return result.recordset[0];
    }

    public async updateEvent(eventId: number, event: events): Promise<void> {
        const pool = await poolPromise;
        await pool.request()
            .input('EventID', sql.Int, eventId)
            .input('Title', sql.NVarChar, event.Title)
            .input('Category', sql.NVarChar, event.Category)
            .input('Description', sql.Text, event.Description)
            .input('Date', sql.Date, event.Date)
            .input('Time', sql.Time, event.Time)
            .input('Location', sql.NVarChar, event.Location)
            .input('Price', sql.Decimal, event.Price)
            .input('EventImage', sql.NVarChar, event.EventImage)
            .execute('spUpdateEvent');
    }

    public async deleteEvent(EventID: number): Promise<void> {
        const pool = await poolPromise;
        await pool.request()
            .input('EventID', sql.Int, EventID)
            .execute('spDeleteEvent');
    }
}
