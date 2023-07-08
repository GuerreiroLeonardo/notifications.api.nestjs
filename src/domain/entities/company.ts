import { CompanyStatus } from 'domain/common/company-status.enum';
import { ICompany } from 'domain/interfaces/company.interface';
import { BaseEntity } from './base-entity';

export class Tier {
  tier: string;
  pricePerConversarion: number;
  conversationsLimit: number;
  pricePerSms: number;
  smsLimit: number;
}

export class Company extends BaseEntity implements ICompany {
  name: string;
  monthlyFee: number;
  status: CompanyStatus;
  tiers: Array<Tier>;
  constructor(init: Partial<Company>) {
    super();
    Object.assign(this, init);
  }
}
