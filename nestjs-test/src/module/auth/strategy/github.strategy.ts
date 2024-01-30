import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { UserService } from '@/module/user';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(GithubStrategy.name);

  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({ ...configService.get('github') });
  }

  async validate(
    accessToken: any,
    refreshToken: any,
    profile: any,
  ): Promise<any> {
    this.logger.debug('validate', profile);

    if (!profile) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.github(profile);
    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      ...user,
      githubUsername: profile.username,
      githubEmail: profile?._json?.email,
    };
  }
}
