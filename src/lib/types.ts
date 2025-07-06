export type Output = {
  type: 'input' | 'output' | 'error';
  text: string;
  path?: string;
};

export interface File {
  type: 'file';
  content: string;
}

export interface Directory {
  type: 'directory';
  children: { [key: string]: File | Directory };
}

export type FileSystem = Directory;

export type TerminalState = {
  fileSystem: FileSystem;
  currentDirectory: string;
  history: string[];
};

export type Command = (
  state: TerminalState,
  args: string[]
) => {
  newOutputs: Output[];
  newState?: Partial<TerminalState>;
} | Promise<{
  newOutputs: Output[];
  newState?: Partial<TerminalState>;
}>;
