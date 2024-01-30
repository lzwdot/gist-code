export {};

declare global {
  type AnyType = any;
  namespace Express {
    interface Request {
      ability: AnyType;
      render: AnyType;
      flash: AnyType;
      __: AnyType;
    }

    interface Response {
      flash: AnyType;
    }
  }
}
