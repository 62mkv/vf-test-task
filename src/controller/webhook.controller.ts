import { Body, Controller, Logger, Post } from "@nestjs/common";
import { ApiExcludeEndpoint } from "@nestjs/swagger";
import { SessionStatus } from "src/model/session.model";
import { DecisionPayload } from "src/model/veriff.decision";
import { SessionRepository } from "src/repository/session.repository";
import { UserRepository } from "src/repository/user.repository";

@Controller('api/hooks')
export class WebhookController {
    constructor(
        private sessionRepository: SessionRepository,
        private userRepository: UserRepository,
    ) {}

    private readonly logger = new Logger(WebhookController.name);
  
    @Post('decision')
    @ApiExcludeEndpoint()
    async decision(@Body() decisionPayload: DecisionPayload) {
        await this.sessionRepository.updateSessionStatus(decisionPayload.verification.id,  decisionPayload.verification.status);

        // TODO: we'd need something to purge those sessions; maybe on first successful login ? 
        const session = await this.sessionRepository.getSession(decisionPayload.verification.id);

        if (session.status === SessionStatus.APPROVED) {
            await this.userRepository.createUser(session.account);
        }
    }
}
