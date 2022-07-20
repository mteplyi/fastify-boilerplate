import { HttpError, InternalServerError } from 'src/core/errors';
import { getLogger } from 'src/logger';
import type { MainFastifyErrorHandler } from 'src/types';
import { getRequestId } from 'src/util/req-id';

const log = getLogger(__filename);

export const errorHandler: MainFastifyErrorHandler = async (error, request, reply) => {
  const replyWithHttpError = (errorData: { statusCode: number; message: string; details?: unknown }) =>
    reply.status(errorData.statusCode).send({
      statusCode: errorData.statusCode,
      message: errorData.message,
      requestId: getRequestId(),
      details: errorData.details,
    });

  if (error.statusCode === 400 && 'validation' in error && error.validation) {
    log.info(error);

    await replyWithHttpError({
      statusCode: error.statusCode,
      message: error.message,
      details: error.validation.map((vr) => ({
        keyword: vr.keyword,
        message: vr.message,
        params: vr.params,
      })),
    });

    return;
  }

  if (error instanceof InternalServerError) {
    log.error(error);
    await replyWithHttpError(error);
    return;
  }

  if (error instanceof HttpError) {
    log.info(error);
    await replyWithHttpError(error);
    return;
  }

  log.error(error);
  await replyWithHttpError(new InternalServerError());
};
