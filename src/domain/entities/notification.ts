import { NotificationType } from 'domain/common/notification-type.enum';
import { INotification } from 'domain/interfaces/notification.interface';
import { BaseEntity } from './base-entity';

export class Notification extends BaseEntity implements INotification {
  phoneNumber: string;
  type: NotificationType;
  company: string;
  billingMonth: string;
  billingYear: string;
  constructor(init: Partial<Notification>) {
    super();
    Object.assign(this, init);
  }
}
