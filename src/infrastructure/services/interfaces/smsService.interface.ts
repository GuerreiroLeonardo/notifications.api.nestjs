import { ISendSmsResponse } from 'domain/responses/sendSms.response';

export interface ISmsService {
  sendSms(recipients: string[], content: string): Promise<ISendSmsResponse>;
}
