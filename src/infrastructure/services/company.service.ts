import { Injectable } from '@nestjs/common';
import {
  ICompany,
  ICompanyKey,
  ITier,
} from 'domain/interfaces/company.interface';
import { ConditionInitializer } from 'dynamoose/dist/Condition';
import { InjectModel, Model } from 'nestjs-dynamoose';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('Company')
    private companyModel: Model<ICompany, ICompanyKey>,
  ) {}

  async get(filter?: ConditionInitializer) {
    return await this.companyModel.scan(filter).exec();
  }

  async insert(company: ICompany) {
    return await this.companyModel.create(company);
  }

  async update(id: string, company: ICompany) {
    return await this.companyModel.update({ id: id }, company);
  }

  async addTier(id: string, tiers: Array<ITier>) {
    return await this.companyModel.update(
      { id: id },
      { $ADD: { tiers: tiers } },
    );
  }
}
