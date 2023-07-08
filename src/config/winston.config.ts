import { utilities, WinstonModule, WinstonModuleOptions } from 'nest-winston';
import winston from 'winston';

export function ConfigureWinston() {
  const env: string | undefined = process.env.ENVIRONMENT;
  const format =
    env == 'local' ? utilities.format.nestLike() : winston.format.json();

  const winstonConfig: WinstonModuleOptions = {
    levels: winston.config.npm.levels,
    level: process.env.LOG_LEVEL || 'info',
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          format,
          winston.format.colorize(),
        ),
      }),
    ],
  };

  return winstonConfig;
}

export async function CreateLogger() {
  const winstonConfig = ConfigureWinston();
  return WinstonModule.createLogger(winstonConfig);
}
