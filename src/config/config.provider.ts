import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ConfigProvider {
    private apiUrl: string;
    private authClient: string;
    private apiPrivateKey: string;
    private dbFolder: string;
    private logger = new Logger(ConfigProvider.name);

    constructor(private config: ConfigService,) {
        this.authClient = this.getConfigValue('X_AUTH_CLIENT');
        this.apiPrivateKey = this.getConfigValue('X_PRIVATE_KEY');
        this.apiUrl = this.getConfigValue('API_URL');
        this.dbFolder = this.getConfigValue('DB_PATH');
    }

    public getApiUrl(): string {
        return this.apiUrl;
    }

    public getAuthClient() {
        return this.authClient;
    }

    public getApiPrivateKey() {
        return this.apiPrivateKey;
    }

    public getDbFolder() {
        return this.dbFolder;
    }

    getConfigValue(name: string): string {
        if (this.config.get(name)) {
            return this.config.get(name);
        }
        
        this.logger.error(`Value ${name} not found in the config`);
        throw new Error(`Value ${name} not found in the config`);
    }
}