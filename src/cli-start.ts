/* eslint-disable @typescript-eslint/no-unused-vars */

const COLORS = {
  black: '\u001B[30m',
  red: '\u001B[31m',
  green: '\u001B[32m',
  yellow: '\u001B[33m',
  blue: '\u001B[34m',
  magenta: '\u001B[35m',
  cyan: '\u001B[36m',
  white: '\u001B[37m',
  console_color: '\u001B[0m',
} as const;

const colorConsoleText = (text: string, color: keyof typeof COLORS) => {
  const coloredText = `${COLORS[color]}${text}${COLORS.console_color}`;
  return console.log(coloredText);
};

const DEFAULT_FILE_NAME = 'swagger-api';

export function startCli(cwd = process.cwd(), argv = process.argv) {
  try {
    console.log('CLI');
  } catch (error: any) {
    colorConsoleText('❌ Agile CSS Error: ' + error.message, 'red');
  }
}
