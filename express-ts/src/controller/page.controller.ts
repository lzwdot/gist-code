import createHttpError from 'http-errors';
import { Request, Response } from 'express';

export class PageController {
  public render = async (req: Request, res: Response) => {
    try {
      const { path } = req.params;
      if (path === undefined) {
        throw `The page ${path} was not found`;
      }

      res.render(`page/${path}`);
    } catch (err) {
      throw createHttpError(404, err);
    }
  };
}
