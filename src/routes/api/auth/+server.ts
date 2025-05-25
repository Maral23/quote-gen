import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
    cookies.delete('token', {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    return json({ 
        success: true,
        message: 'Logged out successfully'
    });
};