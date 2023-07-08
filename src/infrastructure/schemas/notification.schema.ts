import { NotificationType } from 'domain/common/notification-type.enum';
import * as dynamoose from 'dynamoose';
import { DateTime } from 'luxon';

export const NotificationSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    required: true,
  },
  type: {
    type: String,
    enum: [NotificationType.SMS, NotificationType.WHATSAPP],
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  billingMonth: {
    type: String,
    required: true,
  },
  billingYear: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
    default: DateTime.now().toUTC().toISO(),
  },
  updatedAt: {
    type: String,
    required: false,
  },
});
