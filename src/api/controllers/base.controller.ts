import { Res } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseDTO } from 'application/common/response.factory';

export class BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async SendCommand<T>(@Res() response, command: object) {
    const data = (await this.commandBus.execute(command)) as ResponseDTO<T>;
    return this.SetResponse(response, data);
  }

  async SendQuery<T>(@Res() resp, query: object) {
    const data = (await this.queryBus.execute(query)) as ResponseDTO<T>;
    return this.SetResponse(resp, data);
  }

  SetResponse<T>(@Res() resp, payload: ResponseDTO<T>) {
    resp
      .status(payload.status)
      .send(
        payload.errorMessage
          ? { errorMessage: payload.errorMessage }
          : payload.data,
      );
  }
}
