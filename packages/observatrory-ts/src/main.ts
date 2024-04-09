import amqp from "amqplib";

export interface Logger {
  trace: (log: Partial<Log>) => Promise<void>;
  debug: (log: Partial<Log>) => Promise<void>;
  info: (log: Partial<Log>) => Promise<void>;
  warn: (log: Partial<Log>) => Promise<void>;
  error: (log: Partial<Log>) => Promise<void>;
  fatal: (log: Partial<Log>) => Promise<void>;
}

interface LoggerOptions {
  logToConsole: boolean;
  logToServer: boolean;
  serverEndpoint: string;
  secret: string;
  minLevel?: Severity;
}

export enum Severity {
  Trace = "trace",
  Debug = "debug",
  Info = "info",
  Warn = "warn",
  Error = "error",
  Fatal = "fatal",
}

export default function createLogger(options: LoggerOptions) {
  return {
    trace: async (log: Partial<Log>) => sendLog(Severity.Trace, log, options),
    debug: async (log: Partial<Log>) => sendLog(Severity.Debug, log, options),
    info: async (log: Partial<Log>) => sendLog(Severity.Info, log, options),
    warn: async (log: Partial<Log>) => sendLog(Severity.Warn, log, options),
    error: async (log: Partial<Log>) => sendLog(Severity.Error, log, options),
    fatal: async (log: Partial<Log>) => sendLog(Severity.Fatal, log, options),
  };
}

interface Log {
  logType: string;
  message: string;
  json: any;
  meta: any;
}

async function sendLog(
  severity: Severity,
  log: Partial<Log>,
  options: LoggerOptions
) {
  if (options.logToServer) {
    let connection;
    try {
      connection = await amqp.connect(options.serverEndpoint);
      const queue = "logs";
      const channel = await connection.createChannel();

      await channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(log)));
    } catch (error) {
      console.error(error);
    } finally {
      if (connection) {
        connection.close();
      }
    }
  }

  if (options.logToConsole) {
    console.log(`[${severity}]: ${log.message} \t ${JSON.stringify(log.json) ?? ""}`);
  }
}
