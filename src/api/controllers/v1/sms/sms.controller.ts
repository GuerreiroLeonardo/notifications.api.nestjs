import { Body, Controller, Post, Res } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BaseController } from 'api/controllers/base.controller';
import { SendSmsCommand } from 'application/commands/conversations/create-conversation/send-sms.command';
import { SendSmsCommandResponse } from 'application/commands/conversations/create-conversation/send-sms.response';

@Controller({ version: '1', path: '' })
export default class SmsController extends BaseController {
  constructor(commandBus: CommandBus, queryBus: QueryBus) {
    super(commandBus, queryBus);
  }

  @Post('send')
  async sendSms(@Res() ctxResponse, @Body() command: SendSmsCommand) {
    return this.SendCommand<SendSmsCommandResponse>(
      ctxResponse,
      new SendSmsCommand(command),
    );
  }
}
