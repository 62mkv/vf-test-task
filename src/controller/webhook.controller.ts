import { Body, Controller, Logger, Post } from "@nestjs/common";
import { ApiExcludeEndpoint } from "@nestjs/swagger";
import { DecisionPayload } from "src/model/decision";

@Controller('api/hooks')
export class WebhookController {
    constructor() {}

    private readonly logger = new Logger(WebhookController.name);
  
    @Post('decision')
    @ApiExcludeEndpoint()
    decision(@Body() decisionPayload: DecisionPayload) {
        this.logger.log(`Obtained decision notification: ${JSON.stringify(decisionPayload)}`);
    }
}
