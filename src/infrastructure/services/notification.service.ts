import { Injectable } from '@nestjs/common';
import {
  INotification,
  INotificationKey,
} from 'domain/interfaces/notification.interface';
import { InjectModel, Model } from 'nestjs-dynamoose';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel('Notification')
    private notificationModel: Model<INotification, INotificationKey>,
  ) {}

  async insert(notification: INotification) {
    return await this.notificationModel.create(notification);
  }
}
