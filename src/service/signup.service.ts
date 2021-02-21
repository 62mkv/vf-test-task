import { Injectable } from "@nestjs/common";
import { SignupUserDetails } from "src/model/signup";
import { VeriffService } from "./veriff.service";

@Injectable()
export class SignupService {
    constructor(
        private veriffClient: VeriffService
    ) {}

    public async startSignupProcess(accountDetails: SignupUserDetails): Promise<string> {
        return this.veriffClient.createSession(accountDetails)
        .then(sessionId => this.veriffClient.uploadMedia(sessionId, accountDetails.documentImage.filename))
        .then(sessionId => this.veriffClient.submitSession(sessionId));
    }
}