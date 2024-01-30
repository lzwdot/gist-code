import { Request, Response } from 'express';
import { UserService } from '../service/user.service';

const userService = new UserService();
export class UserController {
  public index = async (req: Request, res: Response) => {
    const userInfo = await userService.findOneBy('root');
    res.json(userInfo);
  };
}
