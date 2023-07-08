import { Inject, forwardRef } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  ResponseDTO,
  ResponseFactory,
} from 'application/common/response.factory';
import { NotificationType } from 'domain/common/notification-type.enum';
import { Notification } from 'domain/entities/notification';
import { D7SmsService } from 'infrastructure/services/d7Sms.service';
import { ISmsService } from 'infrastructure/services/interfaces/smsService.interface';
import { NotificationService } from 'infrastructure/services/notification.service';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';
import { SendSmsCommand } from './send-sms.command';
import { SendSmsCommandResponse } from './send-sms.response';

@CommandHandler(SendSmsCommand)
export class SendSmsCommandHandler implements ICommandHandler<SendSmsCommand> {
  constructor(
    private readonly _notificationService: NotificationService,
    @Inject(forwardRef(() => D7SmsService))
    private _smsService: ISmsService,
  ) {}

  async execute(
    command: SendSmsCommand,
  ): Promise<ResponseDTO<SendSmsCommandResponse>> {
    try {
      const entity = new Notification({
        id: uuidv4(),
        type: NotificationType.SMS,
        company: command.company_id,
        billingMonth: DateTime.now().month.toString(),
        billingYear: DateTime.now().year.toString(),
        createdAt: DateTime.now().toUTC().toISO(),
      });
      // throw new Error('2312');

      const smsReponse = await this._smsService.sendSms(
        command.recipients,
        command.content,
      );

      const conversation = await this._notificationService.insert(entity);
      const response = new SendSmsCommandResponse({
        id: conversation.id,
        status: 'SMS sent successfully!',
        sentAt: smsReponse.created_at,
      });

      return ResponseFactory.Success(response);
    } catch (err) {
      return ResponseFactory.Error(err.message);
    }
  }
}
