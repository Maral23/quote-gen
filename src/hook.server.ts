import jwt from 'jsonwebtoken';
import type { Handle } from '@sveltejs/kit';

const SECRET_KEY = process.env.JWT_SECRET;
const RENEW_THRESHOLD = 15 * 60; // 15 minutes before expiration

if (!SECRET_KEY) {
    throw new Error('Missing JWT_SECRET in environment variables');
}

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get('token');
    
    if (token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY) as { 
                id: number; 
                username: string;
                exp: number;
            };
            
            // Check if token needs renewal
            const now = Math.floor(Date.now() / 1000);
            const expiresIn = decoded.exp - now;
            
            if (expiresIn < RENEW_THRESHOLD) {
                const newToken = jwt.sign(
                    { id: decoded.id, username: decoded.username },
                    SECRET_KEY,
                    { expiresIn: '1h' }
                );
                
                event.cookies.set('token', newToken, {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 // 1 hour
                });
            }

            event.locals.user = {
                id: decoded.id,
                username: decoded.username
            };
        } catch (err) {
            event.cookies.delete('token', {
                path: '/',
                secure: process.env.NODE_ENV === 'production'
            });
            event.locals.user = null;
        }
    }

    return resolve(event);
};