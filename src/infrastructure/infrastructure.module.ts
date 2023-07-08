import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { CompanySchema } from './schemas/company.schema';
import { NotificationSchema } from './schemas/notification.schema';
import { CompanyService } from './services/company.service';
import { D7SmsService } from './services/d7Sms.service';
import { NotificationService } from './services/notification.service';

const isLocal =
  process.env.ENVIRONMENT == 'LOCAL' ||
  process.env.ENVIRONMENT == 'LOCAL-SERVER';

@Module({
  imports: [
    DynamooseModule.forRoot({
      local: isLocal,
      aws: {
        region: isLocal ? 'localhost' : process.env.MY_AWS_REGION,
        accessKeyId: process.env.DEFAULT_ACCESS_KEY,
        secretAccessKey: process.env.DEFAULT_SECRET,
      },
    }),
    DynamooseModule.forFeature([
      {
        name: 'Notification',
        options: {
          tableName: process.env.NOTIFICATIONS_TABLE,
        },
        schema: NotificationSchema,
      },
      {
        name: 'Company',
        options: {
          tableName: process.env.COMPANIES_TABLE,
        },
        schema: CompanySchema,
      },
    ]),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 10000,
      }),
    }),
  ],
  providers: [NotificationService, CompanyService, D7SmsService],
  exports: [NotificationService, CompanyService, D7SmsService],
})
export class InfrastructureModule {}
