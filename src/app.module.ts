import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controller/app.controller';
import { SignatureService } from './service/signature.service';
import { WebhookController } from './controller/webhook.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { VeriffService } from './service/veriff.service';
import { SignupService } from './service/signup.service';
import { ConfigProvider } from './service/config.provider';

@Module({
  imports: [ConfigModule.forRoot({
  }), HttpModule],
  controllers: [AppController, WebhookController],
  providers: [SignatureService, VeriffService, SignupService, ConfigProvider],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware)
        .forRoutes(WebhookController);
    }
}
