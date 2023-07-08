import { CompanyStatus } from 'domain/common/company-status.enum';
import * as dynamoose from 'dynamoose';
import { DateTime } from 'luxon';

export const TierSchema = new dynamoose.Schema({
  tier: {
    type: String,
    required: true,
  },
  pricePerConversarion: {
    type: Number,
    required: true,
  },
  conversationsLimit: {
    type: Number,
    required: false,
    default: null,
  },
  pricePerSms: {
    type: Number,
    required: false,
    default: null,
  },
  smsLimit: {
    type: Number,
    required: false,
    default: null,
  },
});

export const CompanySchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  monthlyFee: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: [CompanyStatus.ACTIVE, CompanyStatus.INACTIVE],
    required: true,
  },
  tiers: {
    type: Array,
    schema: [TierSchema],
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
