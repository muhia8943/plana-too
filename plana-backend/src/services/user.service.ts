import { poolPromise } from '../config/sql.config';
import { user } from '../interfaces/user.interface';
import * as sql from 'mssql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from '../helpers/emailHelpers';
import ejs from 'ejs';
import path from 'path';

export class AuthService {
    public async register(user: user): Promise<void> {
        const pool = await poolPromise;
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await pool.request()
            .input('username', sql.NVarChar, user.username)
            .input('password', sql.NVarChar, hashedPassword)
            .input('email', sql.NVarChar, user.email)
            .input('role', sql.NVarChar, user.Role || 'user')
            .execute('spRegisterUser');

        // Send welcome email
        const templatePath = path.resolve(__dirname, '../templates/welcomeUser.ejs');
        const emailContent = await ejs.renderFile(templatePath, { UserName: user.username });
        
        const mailOptions = {
            from: process.env.EMAIL as string,
            to: user.email,
            subject: "Welcome to plana",
            html: emailContent
        };

        await sendMail(mailOptions);
    }

    public async login(email: string, password: string): Promise<{ token: string, Role: string, userID: number } | null> {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .execute('spLoginUser');
        
        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                const token = jwt.sign({ id: user.id, Role: user.Role }, process.env.JWT_SECRET as string, {
                    expiresIn: '1h'
                });
                return { token, Role: user.Role, userID: user.id }; // Return the token, role, and userID
            }
        }
        return null;
    }


    public async getAllUsers(): Promise<user[]> {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Users');
        return result.recordset;
    }

    public async deleteUser(id: number): Promise<void> {
        const pool = await poolPromise;
        await pool.request().input('id', sql.Int, id).execute('spDeleteUser');
    }
    public async updateUser(id: number, updateUser: Partial<user>): Promise<void> {
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, id)
            .input('username', sql.NVarChar, updateUser.username)
            .input('email', sql.NVarChar, updateUser.email)
            .input('role', sql.NVarChar, updateUser.Role)
            .execute('spUpdateUser');
    }
}
