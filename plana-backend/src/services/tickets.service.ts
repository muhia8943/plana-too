import { poolPromise } from '../config/sql.config';
import { tickets } from '../interfaces/tickets.interface';
import * as sql from 'mssql';

export class TicketService {
    public async createTicket(ticket: tickets): Promise<tickets> {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('EventID', sql.Int, ticket.EventID)
            .input('TicketType', sql.VarChar, ticket.TicketType)
            .input('Price', sql.Decimal, ticket.Price)
            .execute('spCreateTicket');
        return result.recordset[0];
    }

    public async updateTicket(id: number, ticket: tickets): Promise<tickets | null> {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('TicketID', sql.Int, id)
            .input('EventID', sql.Int, ticket.EventID)
            .input('TicketType', sql.VarChar, ticket.TicketType)
            .input('Price', sql.Decimal, ticket.Price)
            .execute('spUpdateTicket');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }

    public async deleteTicket(id: number): Promise<boolean> {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('TicketID', sql.Int, id)
            .execute('spDeleteTicket');
        return result.rowsAffected[0] > 0;
    }

    public async getAllTickets(): Promise<tickets[]> {
        const pool = await poolPromise;
        const result = await pool.request()
            .execute('spGetAllTickets');
        return result.recordset;
    }

    public async getTicketById(id: number): Promise<tickets | null> {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('TicketID', sql.Int, id)
            .execute('spGetTicketById');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
    public async getTicketsByEventId(eventId: number): Promise<tickets[]> {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('EventID', sql.Int, eventId)
            .query('SELECT * FROM Tickets WHERE EventID = @EventID');
        return result.recordset;
    }
}
