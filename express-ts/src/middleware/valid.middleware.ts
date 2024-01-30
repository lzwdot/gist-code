import createHttpError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';

export function validMiddleware(type: ClassConstructor<object>) {
  return function (req: Request, res: Response, next: NextFunction) {
    const dto = plainToInstance(
      type,
      Object.assign({}, req.body, req.params, req.query),
    );
    validateOrReject(dto)
      .then(() => {
        next();
      })
      .catch((errors: ValidationError[]) => {
        next(createHttpError(400, { errors }));
      });
  };
}
