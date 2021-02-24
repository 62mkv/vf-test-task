import { Injectable } from "@nestjs/common";
import { UserAlreadyExistsError } from "src/model/error";
import { SessionStatus } from "src/model/session.model";
import { CheckSessionResult, SignupUserDetails } from "src/model/signup.model";
import { SessionRepository } from "src/repository/session.repository";
import { UserRepository } from "src/repository/user.repository";
import { VeriffService } from "./veriff.service";

@Injectable()
export class SignupService {
    constructor(
        private veriffClient: VeriffService,
        private sessionRepository: SessionRepository,
        private userRepository: UserRepository,
    ) {}

    public async startSignupProcess(accountDetails: SignupUserDetails): Promise<string> {
        return await this.userRepository.checkUser(accountDetails.username)
        .then(exists => {
            if (exists) {
                throw new UserAlreadyExistsError(accountDetails.username);
            }
        })
        .then(_ => this.veriffClient.createSession(accountDetails))
        .then(sessionId => this.veriffClient.uploadMedia(sessionId, accountDetails.documentImage.filename))
        .then(sessionId => this.veriffClient.submitSession(sessionId))
        .then(async sessionId => {
            await this.sessionRepository.createSession(sessionId, accountDetails);
            return sessionId;
        });
    }

    public async checkSession(sessionId: string): Promise<CheckSessionResult> {
        return await this.sessionRepository.getSession(sessionId)
                        .then(session => {
                            if (session) {
                                if (session.status === SessionStatus.APPROVED) {
                                    return { kind: "success", sessionId: session.id };
                                } else {
                                    return { kind: "failure", reason: "Session is not (yet) approved", details: { status: session.status }};
                                }
                            } else {
                                return { kind: "failure", reason: "Session not found"};
                            }
                        });
    }
}