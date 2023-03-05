import dayjs from 'dayjs';
import { NextFunction, Request, Response } from 'express';
import ErrorMessage from '../../utils/error.utils';
import logger from '../../utils/logger.utils';

/**
 * @param  {} err
 * @param  {} req
 * @param  {} res
 * @desc Error handler
 * @access public
 * @function {@link handleError}
 */
export const handleError = async (err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  let code = 500;
  if (err instanceof ErrorMessage.GeneralError) {
    code = err.getCode();
  }

  const correlationId = req.headers['x-correlation-id'];
  logger.error(err, { correlationId });
  return res.status(code).json({
    correlationId,
    message: err.message,
  });
};

/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @desc process request handler
 * @access public
 * @function {@link processRequest}
 */
export const processRequest = async (req: Request, res: Response, next: NextFunction) => {
  let correlation = req.headers['x-correlation-id'];
  if (!correlation) {
    correlation = dayjs().format('DD MMMM YYYY, hh:mm:ss A').toString();
    req.headers['x-correlation-id'] = correlation;
  }
  res.set('x-correlation-id', correlation);
  return next();
};

/**
 * @param  {} validate
 * @param  {} =>(req
 * @param  {} next
 * @desc validation handler
 * @access public
 * @function {@link handleValidation}
 */
export const handleValidation =
  (validate: any) => (req: Request, res: Response, next: NextFunction) => {
    const result = validate(req.body);
    const isValid = result.error == null;
    if (isValid) {
      return next();
    }

    const { details } = result.error;
    const messages = details.map((e: any) => e.message);
    const msg = messages.join(', ');
    throw new ErrorMessage.BadRequest(msg);
  };
