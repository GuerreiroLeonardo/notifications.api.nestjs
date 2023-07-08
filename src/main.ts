import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ApiModule } from 'api/api.module';
import { Context } from 'aws-lambda';
import { createServer, proxy, Response } from 'aws-serverless-express';
import { CreateLogger } from 'config/winston.config';
import express, { Express } from 'express';
import { Server } from 'http';

let cachedServer: Server;
async function createExpressApp(
  expressApp: Express,
): Promise<INestApplication> {
  const logger = await CreateLogger();
  const app = await NestFactory.create(
    ApiModule,
    new ExpressAdapter(expressApp),
    { logger },
  );
  return app;
}

async function bootstrap(): Promise<Server> {
  console.log('oiiiii');
  const expressApp = express();

  const app = await createExpressApp(expressApp);
  if (process.env.ENVIRONMENT == 'LOCAL-SERVER') {
    await app.listen(3000);
  } else {
    await app.init();
    return createServer(expressApp);
  }
}
export async function handler(event: any, context: Context): Promise<Response> {
  if (!cachedServer) {
    const server = await bootstrap();
    cachedServer = server;
  }
  return proxy(cachedServer, event, context, 'PROMISE').promise;
}

if (process.env.ENVIRONMENT == 'LOCAL-SERVER') {
  bootstrap();
}
