export class SendSmsCommandResponse {
  id: string;
  status: string;
  sentAt: string;

  constructor(init?: Partial<SendSmsCommandResponse>) {
    Object.assign(this, init);
  }
}
