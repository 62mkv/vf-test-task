import { HttpModule, Module } from '@nestjs/common';
import { ConfigWrapModule } from 'src/config/config-wrapping.module';
import { RepositoryModule } from 'src/repository/repository.module';
import { SignatureService } from './signature.service';
import { SignupService } from './signup.service';
import { VeriffService } from './veriff.service';

@Module({
    imports: [ConfigWrapModule, HttpModule, RepositoryModule], 
    providers: [SignatureService, VeriffService, SignupService],
    exports: [SignatureService, VeriffService, SignupService]
})
export class ServiceModule {}
