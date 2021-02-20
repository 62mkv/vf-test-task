import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controller/app.controller';
import { SignatureService } from './service/signature.service';
import { WebhookController } from './controller/webhook.controller';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, WebhookController],
  providers: [SignatureService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware)
        .forRoutes(WebhookController);
    }
}
