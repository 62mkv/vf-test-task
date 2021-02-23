import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RepositoryModule } from 'src/repository/repository.module';
import { AuthService } from './auth.service';
import { BasicAuthStrategy } from './basic-auth.strategy';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        RepositoryModule,
        JwtModule.register({
            // TODO: I know it's not secure!! But also, I don't know how to use DI here, yet.. 
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
          }),    
        ],
    providers: [AuthService, BasicAuthStrategy, JwtStrategy],
    exports: [AuthService, JwtModule]
})
export class AuthModule {}
