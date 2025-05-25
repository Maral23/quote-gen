import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Quote } from '$lib/types/auth';
// Mock database
let savedQuotes = [
    {
        _id: '1',
        content: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
        userId: 1
    },
    {
        _id: '2',
        content: 'Life is what happens when you\'re busy making other plans.',
        author: 'John Lennon',
        userId: 1
    }
];


export const GET: RequestHandler = async () => {
    return json(savedQuotes); // Now public
};

export const POST: RequestHandler = async ({ locals, request }) => {
  if (!locals.user?.id) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { quote } = await request.json();
  const userQuotes = savedQuotes.filter(q => q.userId === locals.user?.id);
  return json(userQuotes);
};