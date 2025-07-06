'use server';

/**
 * @fileOverview Provides command suggestions based on user input using AI.
 *
 * - suggestCommand - A function that suggests relevant commands as the user types.
 * - SuggestCommandInput - The input type for the suggestCommand function.
 * - SuggestCommandOutput - The return type for the suggestCommand function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCommandInputSchema = z.object({
  userInput: z.string().describe('The user input in the terminal.'),
  commandHistory: z.string().describe('The history of commands executed by the user.'),
  currentDirectory: z.string().describe('The current directory in the terminal.'),
});
export type SuggestCommandInput = z.infer<typeof SuggestCommandInputSchema>;

const SuggestCommandOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of suggested commands based on the user input.'),
});
export type SuggestCommandOutput = z.infer<typeof SuggestCommandOutputSchema>;

export async function suggestCommand(input: SuggestCommandInput): Promise<SuggestCommandOutput> {
  return suggestCommandFlow(input);
}

const getManPage = ai.defineTool(
  {
    name: 'getManPage',
    description: 'Retrieves the man page for a given command.',
    inputSchema: z.object({
      command: z.string().describe('The command to retrieve the man page for.'),
    }),
    outputSchema: z.string(),
  },
  async input => {
    // TODO: Implement the actual retrieval of the man page. For now, return a placeholder.
    // In a real implementation, this would involve executing `man <command>` and returning the output.
    return `Man page for ${input.command} (placeholder)`;
  }
);

const suggestCommandPrompt = ai.definePrompt({
  name: 'suggestCommandPrompt',
  input: {schema: SuggestCommandInputSchema},
  output: {schema: SuggestCommandOutputSchema},
  tools: [getManPage],
  prompt: `You are an AI assistant that suggests terminal commands based on user input, command history, and current directory.

  Here is the user's current input: "{{userInput}}"
  Here is the user's command history: "{{commandHistory}}"
  The user is currently in this directory: "{{currentDirectory}}"

  Consider the user's input, command history, and current directory to suggest relevant commands.
  If the user's input resembles a command, and you think the user needs help with the command, then use the getManPage tool to learn more about the command.
  Return ONLY a JSON array of suggested commands. Do not include any other text or explanations.
  The array should contain strings.

  Example Output:
  {
    "suggestions": ["ls", "cd", "mkdir"]
  }`,
});

const suggestCommandFlow = ai.defineFlow(
  {
    name: 'suggestCommandFlow',
    inputSchema: SuggestCommandInputSchema,
    outputSchema: SuggestCommandOutputSchema,
  },
  async input => {
    const {output} = await suggestCommandPrompt(input);
    return output!;
  }
);
