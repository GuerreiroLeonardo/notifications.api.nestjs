import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { ISendSmsResponse } from 'domain/responses/sendSms.response';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class D7SmsService {
  constructor(private readonly httpService: HttpService) {}

  async sendSms(
    recipients: string[],
    content: string,
  ): Promise<AxiosResponse<ISendSmsResponse>> {
    const body = JSON.stringify({
      messages: [
        {
          channel: 'sms',
          recipients: recipients,
          content: content,
          msg_type: 'text',
          data_coding: 'text',
        },
      ],
    });
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.D7_SMS_TOKEN}`,
      // Add any additional headers you need
    };

    const response = await firstValueFrom(
      await this.httpService
        .post(`${process.env.D7_SMS_HOST}messages/v1/send`, body, { headers })
        .pipe(
          catchError((error: AxiosError) => {
            throw new Error(error.message);
          }),
        ),
    );
    return response;
  }
}

// {
//     "messages": {
//         "channel": "sms",
//         "recipients": [
//             "+5521982815541",
//             "+5521982815541"
//         ],
//         "content": "Greetings from D7 API",
//         "msg_type": "text",
//         "data_coding": "text"
//     },
//     "message_globals": {
//         "originator": "SignOTP",
//         "report_url": "https://the_url_to_recieve_delivery_report.com"
//     }
//   }
