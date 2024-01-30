import { NextFunction, Request, Response } from 'express';

export function flashMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const push = (msg: string | string[], type = 'info') => {
    const messages: string[] = [];

    if (Array.isArray(msg)) {
      messages.push(...msg.flat());
    } else {
      // do not allow duplicate flash messages
      for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
        if (message === msg) return;
      }
      messages.push(msg);
    }
    req.session.flash = { messages, type };
  };

  const flash = req.session.flash;
  res.locals.flash = flash;
  req.session.flash = null;
  req.flash = res.flash = push;

  // record previously filled data when an error occurs
  const locals = req.body ? { ...req.body } : null;
  if (locals) {
    req.session.locals = locals;
  }
  res.locals = {
    ...res.locals,
    ...req.session.locals,
  };

  next();
}
