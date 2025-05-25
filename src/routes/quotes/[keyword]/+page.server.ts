import { getQuotes } from '$lib/utils/api';
import type { PageServerLoad } from './$types';

import { FALLBACK_QUOTES } from '$lib/utils/fallbackQuotes';

// Update the load function
export const load: PageServerLoad = async ({ params }) => {
    try {
        const quotes = await getQuotes(params.keyword);
        return { 
            quotes: quotes.length > 0 ? quotes : FALLBACK_QUOTES,
            keyword: params.keyword
        };
    } catch (error) {
        return {
            quotes: FALLBACK_QUOTES,
            keyword: params.keyword
        };
    }
};