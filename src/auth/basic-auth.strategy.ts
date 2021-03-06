import { BasicStrategy as Strategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  public async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
        throw new UnauthorizedException();
    }

    return user;    
  }
}
