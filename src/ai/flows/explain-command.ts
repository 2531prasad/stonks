// This file uses server-side code.
'use server';

/**
 * @fileOverview Explains a given command using its man pages.
 *
 * - explainCommand - A function that explains a command.
 * - ExplainCommandInput - The input type for the explainCommand function.
 * - ExplainCommandOutput - The return type for the explainCommand function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {getManPage} from '@/services/command-utils';

const ExplainCommandInputSchema = z.object({
  command: z.string().describe('The command to explain, e.g., `ls -l`.'),
});
export type ExplainCommandInput = z.infer<typeof ExplainCommandInputSchema>;

const ExplainCommandOutputSchema = z.object({
  explanation: z.string().describe('A detailed explanation of the command and its options.'),
});
export type ExplainCommandOutput = z.infer<typeof ExplainCommandOutputSchema>;

export async function explainCommand(input: ExplainCommandInput): Promise<ExplainCommandOutput> {
  return explainCommandFlow(input);
}

const explainCommandPrompt = ai.definePrompt({
  name: 'explainCommandPrompt',
  input: {schema: ExplainCommandInputSchema},
  output: {schema: ExplainCommandOutputSchema},
  prompt: `You are an expert terminal user. Explain the command given by the user, using the man pages provided.

Command: {{{command}}}
Man Pages: {{{manPages}}}

Explanation:`, // Removed the word 'here'.
  tools: [getManPage]
});

const explainCommandFlow = ai.defineFlow(
  {
    name: 'explainCommandFlow',
    inputSchema: ExplainCommandInputSchema,
    outputSchema: ExplainCommandOutputSchema,
  },
  async input => {
    const {output} = await explainCommandPrompt({
      ...input,
      manPages: (await getManPage({command: input.command})),
    });
    return output!;
  }
);
