import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
    /*
    See this question for solutions, concerning access to raw request body with Nest.js: https://stackoverflow.com/questions/54346465/access-raw-body-of-stripe-webhook-in-nest-js
    */
    const app = await NestFactory.create(AppModule, {
        bodyParser: false,
    });

    const rawBodyBuffer = (req, res, buf, encoding) => {
        if (buf && buf.length) {
            req.rawBody = buf.toString(encoding || 'utf8');
        }
    };

    const config = new DocumentBuilder()
        .setTitle('CryptoWallet API')
        .setDescription('API for CryptoWallet.EE platform')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.use(bodyParser.json({ verify: rawBodyBuffer }));
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
    }));

    await app.listen(3000);
}
bootstrap();
