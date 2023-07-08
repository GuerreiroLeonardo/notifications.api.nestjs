import { HttpStatus } from '@nestjs/common';

export class ResponseDTO<T> {
  private _status: number;
  private _data: T;
  private _errorMessage: string;

  public get errorMessage(): string {
    return this._errorMessage;
  }

  public get status(): number {
    return this._status;
  }

  public get data(): T {
    return this._data;
  }

  constructor(status: number, data: T, errors: string) {
    this._status = status;
    this._data = data;
    this._errorMessage = errors;
  }
}

export class ResponseFactory {
  public static Success<T>(
    data: T,
    statusCode: HttpStatus = HttpStatus.OK,
  ): ResponseDTO<T> {
    if (!data) return this.CreateResponse(204, null, null);
    return this.CreateResponse(statusCode, data, null);
  }

  public static Error<T>(
    message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
  ): ResponseDTO<T> {
    return this.CreateResponse(statusCode, null, message);
  }

  private static CreateResponse<T>(
    status: number,
    data: T,
    errors: string,
  ): ResponseDTO<T> {
    return new ResponseDTO<T>(status, data, errors);
  }
}
