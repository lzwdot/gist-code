import { Express, Request, Response, NextFunction } from 'express';
import { UserEntity } from '../entity/user.entity';
import { PostEntity } from '../entity/post.entity';
import { ReplyEntity } from '../entity/reply.entity';
import { TermEntity } from '../entity/term.entity';

interface attribute {
  [x: string]: AnyType;
}

export type User = Partial<UserEntity> & attribute;
export type Post = Partial<PostEntity> & attribute;
export type Reply = Partial<ReplyEntity> & attribute;
export type Term = Partial<TermEntity> & attribute;

export interface GithubUser extends User {
  id?: number;
  login?: string;
  email?: string;
}
