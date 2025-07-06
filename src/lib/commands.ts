import type { Command } from './types';
import { getAbsolutePath, getNode } from './file-system';
import { explainCommand } from '@/ai/flows/explain-command';

const commands: { [key: string]: Command } = {
  help: () => {
    return {
      newOutputs: [
        { type: 'output', text: 'CodeFlow Terminal - AI Powered Terminal' },
        { type: 'output', text: 'Available commands: help, clear, ls, cd, cat, mkdir, echo, pwd, man' },
        { type: 'output', text: 'Try `man <command>` for an AI-powered explanation of a command.' },
      ],
    };
  },

  clear: () => {
    return { newOutputs: [] };
  },

  pwd: (state) => {
    return {
      newOutputs: [{ type: 'output', text: state.currentDirectory.replace(/^~\/?/, '/home/user/') }],
    };
  },

  ls: (state, args) => {
    const path = args[0] ? getAbsolutePath(state.currentDirectory, args[0]) : state.currentDirectory;
    const node = getNode(path, state.fileSystem);

    if (!node) {
      return { newOutputs: [{ type: 'error', text: `ls: cannot access '${path}': No such file or directory` }] };
    }
    if (node.type === 'file') {
      return { newOutputs: [{ type: 'output', text: path }] };
    }
    const children = Object.keys(node.children);
    const outputText = children.length > 0 ? children.join('  ') : '';
    return { newOutputs: [{ type: 'output', text: outputText }] };
  },

  cd: (state, args) => {
    const targetPath = args[0] || '~';
    const newPath = getAbsolutePath(state.currentDirectory, targetPath);
    const node = getNode(newPath, state.fileSystem);

    if (!node || node.type !== 'directory') {
      return { newOutputs: [{ type: 'error', text: `cd: ${targetPath}: Not a directory` }] };
    }

    return {
      newOutputs: [],
      newState: { currentDirectory: newPath },
    };
  },

  cat: (state, args) => {
    if (args.length === 0) {
      return { newOutputs: [{ type: 'error', text: 'cat: missing operand' }] };
    }
    const path = getAbsolutePath(state.currentDirectory, args[0]);
    const node = getNode(path, state.fileSystem);

    if (!node) {
      return { newOutputs: [{ type: 'error', text: `cat: ${args[0]}: No such file or directory` }] };
    }
    if (node.type === 'directory') {
      return { newOutputs: [{ type: 'error', text: `cat: ${args[0]}: Is a directory` }] };
    }
    return { newOutputs: [{ type: 'output', text: node.content }] };
  },

  mkdir: (state, args) => {
    if (args.length === 0) {
      return { newOutputs: [{ type: 'error', text: 'mkdir: missing operand' }] };
    }
    const newDirName = args[0];
    const parentPath = state.currentDirectory;
    const parentNode = getNode(parentPath, state.fileSystem);

    if (parentNode?.type === 'directory') {
      if (parentNode.children[newDirName]) {
        return { newOutputs: [{ type: 'error', text: `mkdir: cannot create directory ‘${newDirName}’: File exists` }] };
      }
      parentNode.children[newDirName] = { type: 'directory', children: {} };
      return { newOutputs: [], newState: { fileSystem: { ...state.fileSystem } } };
    }
    return { newOutputs: [{ type: 'error', text: `mkdir: internal error` }] };
  },

  echo: (state, args) => {
    return { newOutputs: [{ type: 'output', text: args.join(' ') }] };
  },

  man: async (state, args) => {
    if (args.length === 0) {
      return { newOutputs: [{ type: 'error', text: 'What manual page do you want?' }] };
    }
    const commandToExplain = args.join(' ');
    try {
      const { explanation } = await explainCommand({ command: commandToExplain });
      const formattedExplanation = explanation.split('\n').map(line => ({ type: 'output', text: line }));
      return { newOutputs: formattedExplanation };
    } catch (e) {
      return { newOutputs: [{ type: 'error', text: `Error explaining command: ${e instanceof Error ? e.message : String(e)}` }] };
    }
  },
};

export default commands;
