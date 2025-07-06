// This is a mock implementation because we cannot run shell commands on the server.
const manPages: Record<string, string> = {
  ls: `NAME
    ls - list directory contents

SYNOPSIS
    ls [OPTION]... [FILE]...

DESCRIPTION
    List information about the FILEs (the current directory by default).

    -a, --all
        do not ignore entries starting with .

    -l  use a long listing format`,

  cd: `NAME
    cd - change the shell working directory

SYNOPSIS
    cd [DIRECTORY]

DESCRIPTION
    Change the current directory to DIRECTORY. The default DIRECTORY is the value of the HOME shell variable.`,

  cat: `NAME
    cat - concatenate files and print on the standard output

SYNOPSIS
    cat [OPTION]... [FILE]...

DESCRIPTION
    Concatenate FILE(s) to standard output.`,

  mkdir: `NAME
    mkdir - make directories

SYNOPSIS
    mkdir [OPTION]... DIRECTORY...

DESCRIPTION
    Create the DIRECTORY(ies), if they do not already exist.`,

  echo: `NAME
    echo - display a line of text

SYNOPSIS
    echo [SHORT-OPTION]... [STRING]...

DESCRIPTION
    Echo the STRING(s) to standard output.`,

  pwd: `NAME
    pwd - print name of current/working directory

SYNOPSIS
    pwd [OPTION]...

DESCRIPTION
    Print the full filename of the current working directory.`,
  
  help: `NAME
    help - display information about builtin commands.

DESCRIPTION
    Displays a list of available commands.`,
  
  clear: `NAME
    clear - clear the terminal screen

DESCRIPTION
    Clears the terminal screen.`,

  man: `NAME
    man - an interface to the on-line reference manuals

SYNOPSIS
    man [command]
    
DESCRIPTION
    man is the system's manual pager. This version uses AI to explain commands.`,
};

export async function getManPage({ command }: { command: string }): Promise<string> {
  const mainCommand = command.trim().split(' ')[0];
  if (manPages[mainCommand]) {
    return manPages[mainCommand];
  }
  return `No manual entry for ${mainCommand}`;
}
