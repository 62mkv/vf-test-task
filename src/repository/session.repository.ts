import { Injectable, Logger } from '@nestjs/common';
import level from 'level-ts';
import { ConfigProvider } from 'src/config/config.provider';
import { Session, SessionStatus } from 'src/model/session.model';
import { SignupUserDetails } from 'src/model/signup.model';

@Injectable()
export class SessionRepository {
    private db: level<Session>;
    private logger = new Logger(SessionRepository.name);
    constructor(private config: ConfigProvider) {
        this.db = new level<Session>(config.getDbFolder() + '/sessions');
    }

    public async createSession(sessionId: string, userDetails: SignupUserDetails) {
        const session: Session = {
            id: sessionId,
            status: SessionStatus.PENDING,
            account: {
                username: userDetails.username,
                password: userDetails.password,
                email: userDetails.email,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                dateOfBirth: userDetails.dateOfBirth,
            }
        };
        await this.db.put(sessionId, session);
    }


    public async updateSessionStatus(id: string, status: string) {
        let session = await this.db.get(id);
        const statusUc = status.toUpperCase();
        const newStatus = SessionStatus[statusUc];
        this.logger.debug(`Changing session ${id} status to ${newStatus}`);
        session.status = newStatus;
        await this.db.put(id, session);
    }

    public async getSession(id: string): Promise<Session> {
        const session = await this.db.get(id);
        return session;
    }
}
