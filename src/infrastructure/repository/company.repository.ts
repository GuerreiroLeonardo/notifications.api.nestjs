// export interface INotification {
//   insert(
//     entityFilterQuery: FilterQuery<PaymentOrder>,
//     options: any,
//   ): Promise<any>;
// }

// @Injectable()
// export class Conversation
//   extends BaseRepository<PaymentOrderDocument, PaymentOrder>
//   implements INotification
// {
//   constructor(
//     @InjectModel(PaymentOrder.name) model: Model<PaymentOrderDocument>,
//   ) {
//     super(model, PaymentOrder);
//   }

//   async insert(
//     entityFilterQuery: FilterQuery<PaymentOrder>,
//   ): Promise<PaymentOrder> {
//     return await this.findOne(entityFilterQuery);
//   }
// }
