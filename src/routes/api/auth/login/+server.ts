import { json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import type { RequestHandler } from './$types';
import bcrypt from 'bcrypt';


const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) throw new Error('JWT_SECRET is not set');

const HARDCODED_USER = {
  id: 1,
  username: 'user',
  password: '$2b$10$JP7qGBaSDs5EPPzGjA.KieK/A0UPDugR1KC4n4sNaxtvvb7a6iSJG'
};



export const POST: RequestHandler = async ({ cookies, request }) => {
  try {
    const { username, password } = await request.json();

    // Timing-safe comparison
    const validUsername = username === HARDCODED_USER.username;
    const validPassword = await bcrypt.compare(password, HARDCODED_USER.password);

    if (!validUsername || !validPassword) {
      return json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      {
        id: HARDCODED_USER.id,
        username: HARDCODED_USER.username
      },
      SECRET_KEY,
      { expiresIn: '1d' }
    );

    cookies.set('token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24
    });

    return json({
      success: true,
      user: {
        id: HARDCODED_USER.id,
        username: HARDCODED_USER.username
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};