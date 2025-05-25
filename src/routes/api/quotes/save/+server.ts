// src/routes/api/quotes/save/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Quote } from '$lib/types/auth';

// Temporary database
const savedQuotes: Quote[] = [];

export const POST: RequestHandler = async ({ request, locals }) => {
    if (!locals.user?.id) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { quote } = await request.json();
    
    if (typeof quote !== 'object' || !quote.content || !quote.author) {
        return json({ error: 'Invalid quote format' }, { status: 400 });
    }

    const newQuote: Quote = {
        _id: crypto.randomUUID(),
        content: quote.content,
        author: quote.author,
        userId: locals.user.id
    };

    savedQuotes.push(newQuote);
    return json(newQuote, { status: 201 });
};

export const GET: RequestHandler = async ({ locals }) => {
    if (!locals.user?.id) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userQuotes = savedQuotes.filter(q => q.userId === locals.user?.id);
    return json(userQuotes);
};