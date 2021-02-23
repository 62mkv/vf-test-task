import { Module } from '@nestjs/common';
import { ConfigWrapModule } from 'src/config/config-wrapping.module';
import { SessionRepository } from './session.repository';
import { TransactionRepository } from './transaction.repository';
import { UserRepository } from './user.repository';

@Module({
    imports: [ConfigWrapModule],
    providers: [SessionRepository, UserRepository, TransactionRepository],
    exports: [SessionRepository, UserRepository, TransactionRepository]
})
export class RepositoryModule {}
