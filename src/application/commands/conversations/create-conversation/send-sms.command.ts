export class SendSmsCommand {
  recipients: string[];
  content: string;
  company_id: string;

  constructor(init: Partial<SendSmsCommand>) {
    Object.assign(this, init);
  }
}
