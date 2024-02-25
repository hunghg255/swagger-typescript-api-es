/* eslint-disable unicorn/error-message */
import _ from 'lodash';
import { emojify } from 'node-emoji';

class Logger {
  firstLog = true;
  /**
   * @type {CodeGenConfig}
   */
  config;

  constructor({ config }: any) {
    this.config = config;
  }

  createLogMessage = ({ type, emojiName, messages }: any) => {
    if (this.config.silent) {
      return;
    }

    const emoji = emojify(emojiName);

    if (this.firstLog) {
      this.firstLog = false;
      this.log(
        `swagger-typescript-api(${this.config.version}),${
          process.env.npm_config_user_agent || `nodejs(${process.version})`
        },debug mode ${this.config.debug ? 'ENABLED' : 'DISABLED'}`,
      );
    }

    if (type === 'debug' || this.config.debug) {
      // @ts-ignore
      const trace = new Error().stack
        .split('\n')
        .splice(3)
        .filter(
          (line) =>
            !line.includes('swagger-typescript-api\\node_modules') &&
            !line.includes('swagger-typescript-api/node_modules'),
        )
        .slice(0, 10);
      // @ts-ignore
      const logFn = console[type] || console.log;
      logFn(`${emoji}  [${type}]`, new Date().toISOString());
      if (this.config.debugExtras && Array.isArray(this.config.debugExtras)) {
        logFn(`[${this.config.debugExtras.join(' ')}]`);
      }
      logFn(
        '[message]',
        ..._.map(messages, (message) =>
          _.startsWith(message, '\n') ? `\n          ${message.replace(/\n/, '')}` : message,
        ),
      );
      logFn(trace.join('\n') + '\n---');
      return;
    }
    // @ts-ignore
    console[type](
      emoji,
      ' ',
      ..._.map(messages, (message) =>
        _.startsWith(message, '\n') ? `\n${emoji}   ${message.replace(/\n/, '')}` : message,
      ),
    );
  };

  /**
   *
   * @param messages {any[]}
   */
  log = (...messages: any) =>
    this.createLogMessage({
      type: 'log',
      emojiName: ':sparkles:',
      messages,
    });

  /**
   *
   * @param messages {any[]}
   * @return {void}
   */
  event = (...messages: any) =>
    this.createLogMessage({
      type: 'log',
      emojiName: ':star:',
      messages,
    });

  /**
   *
   * @param messages {any[]}
   * @return {void}
   */
  success = (...messages: any) =>
    this.createLogMessage({
      type: 'log',
      emojiName: ':white_check_mark:',
      messages,
    });

  /**
   *
   * @param messages {any[]}
   * @return {void}
   */
  warn = (...messages: any) =>
    this.createLogMessage({
      type: 'warn',
      emojiName: ':exclamation:',
      messages,
    });

  /**
   *
   * @param messages {any[]}
   * @return {void}
   */
  error = (...messages: any) =>
    this.createLogMessage({
      type: 'error',
      emojiName: ':no_entry:',
      messages,
    });

  /**
   *
   * @param messages {any[]}
   * @return {void}
   */
  debug = (...messages: any) => {
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
