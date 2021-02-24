import { Injectable, Logger } from '@nestjs/common';
import level from 'level-ts';
import { ConfigProvider } from 'src/config/config.provider';
import { AccountDetails } from 'src/model/account-details';

@Injectable()
export class UserRepository {
    private db: level<AccountDetails>;
    private logger = new Logger(UserRepository.name);
    constructor(private config: ConfigProvider) {
        this.db = new level<AccountDetails>(config.getDbFolder() + '/users');
    }

    public async createUser(userDetails: AccountDetails): Promise<AccountDetails> {
        const username = userDetails.username;
        this.logger.debug(`Checking existence for user: ${username}`);
        return await this.db.exists(username)
        .then(async exists => {
            if (!exists) {
                this.logger.debug(`User: ${username} does not exist`);
                this.logger.debug(`Creating user with username ${username}`);
                return await this.db.put(username, userDetails);
            } else {
                this.logger.warn(`User ${username} already exists!`);
                return userDetails;
            }
        })
    }

    public async getUser(username: string): Promise<AccountDetails> {
        return await this.db.get(username);
    }

    public async checkUser(username: string): Promise<boolean> {
        return await this.db.exists(username);
    }

}
