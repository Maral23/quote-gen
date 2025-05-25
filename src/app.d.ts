// src/app.d.ts
declare global {
    namespace App {
        // Server-side locals (available in hooks and endpoints)
        interface Locals {
            user: {
                id: number;
                username: string;
            } | null;
        }

        // Shared page data type (available in all pages)
        interface PageData {
            user?: {
                id: number;
                username: string;
            } | null;
        }

        interface Window {
        addEventListener(type: 'quote-saved', listener: (event: CustomEvent<Quote>) => void): void;}


        interface PrivateEnv {
            JWT_SECRET: string;
         
        }
        
        interface WindowEventMap {
        'quote-saved': CustomEvent<Quote>;
        }

 
        interface PublicEnv {
  
        }
    }


    interface Quote {
        _id: string;
        content: string;
        author: string;
        userId?: number;
        keyword?: string;
    }
}


export {};