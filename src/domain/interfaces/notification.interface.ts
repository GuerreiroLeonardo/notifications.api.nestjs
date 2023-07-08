import { NotificationType } from 'domain/common/notification-type.enum';
import { IBaseEntity } from './base-entity.interface';

export interface INotificationKey {
  id: string;
}

export interface INotification extends INotificationKey, IBaseEntity {
  type: NotificationType;
  company: string;
  billingMonth: string;
  billingYear: string;
}
