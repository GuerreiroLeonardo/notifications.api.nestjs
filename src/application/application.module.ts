import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InfrastructureModule } from 'infrastructure/infrastructure.module';
import { SendSmsCommandHandler } from './commands/conversations/create-conversation/send-sms.command.handler';

@Module({
  imports: [CqrsModule, InfrastructureModule],
  providers: [
    SendSmsCommandHandler,
    // GetCompanyQueryHandler,
  ],
  exports: [
    SendSmsCommandHandler,
    // GetCompanyQueryHandler,
  ],
})
export class ApplicationModule {}
