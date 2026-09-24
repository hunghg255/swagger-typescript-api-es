import { map } from 'lodash-es';

const EMOJIS: Record<string, string> = {
  ':sparkles:': '✨',
  ':star:': '⭐',
  ':white_check_mark:': '✅',
  ':exclamation:': '❗',
  ':no_entry:': '⛔',
  ':black_large_square:': '⬛',
};

/** config fields used by the logger (`CodeGenConfig` / `TemplatesGenConfig`) */
export interface LoggerConfig {
  silent?: boolean;
  debug?: boolean;
  version?: string;
  /** extra info printed with every debug message */
  debugExtras?: unknown[];
}

type LogType = 'log' | 'warn' | 'error' | 'debug';

interface LogMessage {
  type: LogType;
  emojiName: string;
  messages: unknown[];
}

/** `startsWith(message, '\n')` for every value (only strings can start with a new line) */
const isMultilineMessage = (message: unknown): message is string =>
  typeof message === 'string' && message.startsWith('\n');

class Logger {
  firstLog = true;
  config: LoggerConfig;

  constructor({ config }: { config: LoggerConfig }) {
    this.config = config;
  }

  createLogMessage = ({ type, emojiName, messages }: LogMessage) => {
    // `silent` = output only errors to console
    if (this.config.silent && type !== 'error') {
      return;
    }

    const emoji = EMOJIS[emojiName] ?? emojiName;

    if (this.firstLog && !this.config.silent) {
      this.firstLog = false;
      this.log(
        `swagger-typescript-api(${this.config.version}),${
          process.env.npm_config_user_agent || `nodejs(${process.version})`
        },debug mode ${this.config.debug ? 'ENABLED' : 'DISABLED'}`
      );
    }

    if (type === 'debug' || this.config.debug) {
      const trace = (new Error().stack ?? '')
        .split('\n')
        .splice(3)
        .filter(
          (line) =>
            !line.includes('swagger-typescript-api\\node_modules') &&
            !line.includes('swagger-typescript-api/node_modules')
        )
        .slice(0, 10);
      const logFn = console[type] || console.log;
      logFn(`${emoji}  [${type}]`, new Date().toISOString());
      if (this.config.debugExtras && Array.isArray(this.config.debugExtras)) {
        logFn(`[${this.config.debugExtras.join(' ')}]`);
      }
      logFn(
        '[message]',
        ...map(messages, (message) =>
          isMultilineMessage(message) ? `\n          ${message.replace(/\n/, '')}` : message
        )
      );
      logFn(trace.join('\n') + '\n---');
      return;
    }
    console[type](
      emoji,
      ' ',
      ...map(messages, (message) =>
        isMultilineMessage(message) ? `\n${emoji}   ${message.replace(/\n/, '')}` : message
      )
    );
  };

  /**
   *
   * @param messages {unknown[]}
   */
  log = (...messages: unknown[]) =>
    this.createLogMessage({
      type: 'log',
      emojiName: ':sparkles:',
      messages,
    });

  /**
   *
   * @param messages {unknown[]}
   * @return {void}
   */
  event = (...messages: unknown[]) =>
    this.createLogMessage({
      type: 'log',
      emojiName: ':star:',
      messages,
    });

  /**
   *
   * @param messages {unknown[]}
   * @return {void}
   */
  success = (...messages: unknown[]) =>
    this.createLogMessage({
      type: 'log',
      emojiName: ':white_check_mark:',
      messages,
    });

  /**
   *
   * @param messages {unknown[]}
   * @return {void}
   */
  warn = (...messages: unknown[]) =>
    this.createLogMessage({
      type: 'warn',
      emojiName: ':exclamation:',
      messages,
    });

  /**
   *
   * @param messages {unknown[]}
   * @return {void}
   */
  error = (...messages: unknown[]) =>
    this.createLogMessage({
      type: 'error',
      emojiName: ':no_entry:',
      messages,
    });

  /**
   *
   * @param messages {unknown[]}
   * @return {void}
   */
  debug = (...messages: unknown[]) => {
    if (!this.config.debug) {
      return;
    }

    this.createLogMessage({
      type: 'debug',
      emojiName: ':black_large_square:',
      messages,
    });
  };
}

export { Logger };
