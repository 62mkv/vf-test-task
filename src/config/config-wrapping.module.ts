import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigProvider } from './config.provider';

@Module({
    imports: [ConfigModule.forRoot({})],
    providers: [ConfigProvider],
    exports: [ConfigProvider],
})
export class ConfigWrapModule {}
