import { bcryptConstant } from '@/constant';
import * as bcrypt from 'bcrypt';

/**
 * 散列加密
 * @param data
 * @returns
 */
export const genHash = (data: string) => {
  let hash = '';
  if (data) {
    hash = bcrypt.hashSync(data, bcryptConstant.rounds);
  }
  return hash;
};

/**
 * 密文比较
 * @param data
 * @param encrypted
 * @returns
 */
export const isMatch = (data: string, encrypted: string) => {
  if (!data || !encrypted) {
    return false;
  }
  return bcrypt.compareSync(data, encrypted);
};
