import { json, error as kitError } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { FALLBACK_QUOTES } from '$lib/utils/fallbackQuotes';

const FAVQS_API_URL = 'https://favqs.com/api/quotes/';

export const POST: RequestHandler = async ({ request }) => {
    const { keyword } = await request.json();

    // Validate input
    if (typeof keyword !== 'string' || !keyword.trim()) {
        throw kitError(400, 'Please provide a valid keyword');
    }

    try {
        // Fetch quotes from FavQs API
        const response = await fetch(
            `${FAVQS_API_URL}?filter=${encodeURIComponent(keyword)}&type=tag`,
            {
                headers: {
                    'Authorization': `Token token=${env.FAVQS_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`FavQs API error: ${response.status}`);
        }

        const data = await response.json();
        
        // Extract and format quotes
        const quotes = data.quotes?.slice(0, 5).map((quote: any) => ({
            _id: `favqs-${quote.id}`,
            content: quote.body,
            author: quote.author || 'Unknown'
        })) || [];

        // Fallback if no quotes found
        if (quotes.length === 0) {
            quotes.push({
                _id: `fallback-${Date.now()}`,
                content: `No quotes found for "${keyword}". Try another keyword.`,
                author: 'System'
            });
        }

        return json(quotes);

    } catch (error) {
        console.error('Quote generation failed:', error);
        return json(FALLBACK_QUOTES); 
    }
};