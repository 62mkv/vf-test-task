import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
      private userRepository: UserRepository,
      private jwtService: JwtService,
      ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.getUser(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, userId: 0 };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }  
}
