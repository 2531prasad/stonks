// This file is required for Genkit to expose its flows as API endpoints.
import { genkitNextHandler } from '@genkit-ai/next';
import '@/ai/flows/explain-command';
import '@/ai/flows/suggest-command';

export const { GET, POST } = genkitNextHandler();
