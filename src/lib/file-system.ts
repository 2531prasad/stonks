import type { Directory, FileSystem, File } from './types';

export const initialFileSystem: FileSystem = {
  type: 'directory',
  children: {
    '~': {
      type: 'directory',
      children: {
        'projects': {
          type: 'directory',
          children: {
            'codeflow-terminal': {
              type: 'directory',
              children: {
                'README.md': {
                  type: 'file',
                  content: '# CodeFlow Terminal\n\nThis is a project folder for the CodeFlow terminal itself!\n'
                },
              },
            },
          },
        },
        'documents': {
          type: 'directory',
          children: {},
        },
        'README.md': {
          type: 'file',
          content: 'Welcome to CodeFlow Terminal!\n\nThis is a web-based terminal with AI-powered assistance.\nType `help` to see a list of available commands.',
        },
        'about.txt': {
          type: 'file',
          content: 'Built with Next.js, Tailwind CSS, and Google\'s Gemini model.'
        }
      },
    },
  },
};

export const getAbsolutePath = (currentPath: string, targetPath: string): string => {
  if (targetPath.startsWith('/')) {
    return targetPath;
  }
  if (targetPath.startsWith('~/')) {
    return `~/${targetPath.substring(2)}`;
  }

  const parts = currentPath === '~' ? [] : currentPath.split('/').filter(p => p);
  const targetParts = targetPath.split('/').filter(p => p);

  for (const part of targetParts) {
    if (part === '..') {
      if (parts.length > 0) {
        parts.pop();
      }
    } else if (part !== '.') {
      parts.push(part);
    }
  }
  
  return parts.length === 0 ? '~' : `~/${parts.join('/')}`;
};


export const getNode = (path: string, fs: FileSystem): Directory | File | null => {
  const root = fs.children['~'];
  if (path === '~' || path === '~/') return root;

  const parts = path.startsWith('~/') ? path.substring(2).split('/') : path.split('/');
  let currentNode: Directory | File = root;

  for (const part of parts) {
    if (currentNode.type === 'directory' && currentNode.children[part]) {
      currentNode = currentNode.children[part];
    } else {
      return null;
    }
  }
  return currentNode;
};
