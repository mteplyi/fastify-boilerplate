import { HttpError } from 'src/core/errors/HttpError';
import { statusMessages } from 'src/util/rest-api';

export class BadRequestError extends HttpError {
  readonly statusCode = 400;

  readonly message: string;

  constructor(message?: string) {
    super();
    this.message = message ?? statusMessages[this.statusCode];
  }
}
