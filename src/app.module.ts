import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { SignupController } from './controller/signup.controller';
import { TransactionController } from './controller/transaction.controller';
import { WebhookController } from './controller/webhook.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { RepositoryModule } from './repository/repository.module';
import { ServiceModule } from './service/service.module';
import { LoginController } from './controller/login.controller';
import { ConfigWrapModule } from './config/config-wrapping.module';

@Module({
  imports: [PassportModule, RepositoryModule, ServiceModule, AuthModule, ConfigWrapModule],
  controllers: [SignupController, TransactionController, WebhookController, LoginController],
  providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware)
        .forRoutes(WebhookController);
    }
}
