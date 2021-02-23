import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { BasicAuthGuard } from 'src/auth/basic-auth.guard';

@ApiTags('auth')
@ApiBasicAuth()
@Controller('auth')
export class LoginController {
    constructor(private authService: AuthService) {}

    @UseGuards(BasicAuthGuard)
    @ApiOperation({ summary: "Sign in" })
    @Post('/login')
    async login(@Req() req) {
      return this.authService.login(req.user);
    }    
}

