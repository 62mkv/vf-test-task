import { Injectable } from "@nestjs/common";
import { SignupUserDetails } from "src/model/signup";
import { SessionRepository } from "src/repository/session.repository";
import { VeriffService } from "./veriff.service";

@Injectable()
export class SignupService {
    constructor(
        private veriffClient: VeriffService,
        private sessionRepository: SessionRepository
    ) {}

    public async startSignupProcess(accountDetails: SignupUserDetails): Promise<string> {
        return this.veriffClient.createSession(accountDetails)
        .then(sessionId => this.veriffClient.uploadMedia(sessionId, accountDetails.documentImage.filename))
        .then(sessionId => this.veriffClient.submitSession(sessionId))
        .then(async sessionId => {
            await this.sessionRepository.createSession(sessionId, accountDetails);
            return sessionId;
        });
    }
}