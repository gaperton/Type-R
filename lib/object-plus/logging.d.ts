import { Messenger } from './events';
export declare type LogLevel = 'error' | 'warn' | 'debug' | 'info' | 'log';
export declare type LoggerEventHandler = (topic: string, msg: string, props: object) => void;
export declare const isProduction: boolean, logEvents: LogLevel[];
export declare class Logger extends Messenger {
    constructor();
    trigger: (level: LogLevel, topic: string, message: string, props?: object) => this;
    off: (event?: LogLevel) => this;
    on: (handlers: {
        [name in LogLevel]: LoggerEventHandler;
    } | LogLevel, handler?: LoggerEventHandler) => this;
}
export declare const logRouter: Logger;
export declare const log: typeof logRouter.trigger;
