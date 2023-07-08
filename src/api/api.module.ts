import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from 'application/application.module';
import SmsController from './controllers/v1/sms/sms.controller';

@Module({
  imports: [CqrsModule, ApplicationModule],
  controllers: [SmsController],
})
export class ApiModule {}
