import * as fs from 'fs';
import { HttpService, Injectable, Logger, LoggerService } from "@nestjs/common";
import { SignupUserDetails } from "src/model/signup";
import { SessionCreateRequest } from "src/model/veriff.session";
import { ConfigProvider } from "./config.provider";
import { SignatureService } from "./signature.service";

const IMAGE_DIR = 'uploads';

@Injectable()
export class VeriffService {
    private apiUrl: string | void;
    private logger: LoggerService = new Logger(VeriffService.name);
    constructor(
        private config: ConfigProvider,
        private signatureService: SignatureService,
        private httpService: HttpService
    ) {
        this.apiUrl = this.config.getApiUrl();
    }

    public async createSession(accountDetails: SignupUserDetails): Promise<string> {
        const payload = this.createSessionRequestPayload(accountDetails);
        this.logger.debug(JSON.stringify(payload));

        const response = await this.httpService.post(`${this.apiUrl}/sessions/`, payload, {
            headers: this.getHeaders(payload)
        }).toPromise();
        const sessionId = response.data.verification.id;
        this.logger.log(`Session id: ${sessionId}`);
        return sessionId;
    }

    public async uploadMedia(verificationId: string, fileName: string): Promise<string> {
        const payload = {
            image: {
                context: "document-front",
                content: this.readImage(IMAGE_DIR + '/' + fileName),
                timestamp: this.timestamp()
            }
        };

        const response = await this.httpService.post(this.apiUrl + '/sessions/' + verificationId + '/media', payload, {
            headers: this.getHeaders(payload)
        }).toPromise();

        this.logger.log(`Upload media response status: ${response.status}`);
        return verificationId;
    }

    public async submitSession(verificationId: string): Promise<string> {
        const payload = {
            verification: {
                status: "submitted",
                timestamp: this.timestamp()
            }
        };

        const response = await this.httpService.patch(this.apiUrl + '/sessions/' + verificationId, payload, {
            headers: this.getHeaders(payload)
        }).toPromise();

        this.logger.log(`Submit session response status: ${response.status}`);
        return verificationId;
    }

    getHeaders(payload) {
        const signature = this.signatureService.calculateSignature(payload);
        this.logger.debug(`Signature is ${signature}`);
        return {
            'X-AUTH-CLIENT': this.config.getAuthClient(),
            'X-SIGNATURE': signature,
            'Content-Type': 'application/json'
        }
    }

    readImage(file) {
        const bitmap = fs.readFileSync(file);
        return Buffer.from(bitmap).toString('base64');
    }

    createSessionRequestPayload(accountDetails: SignupUserDetails): SessionCreateRequest {
        return {
            verification: {
                person: {
                    firstName: accountDetails.firstName,
                    lastName: accountDetails.lastName,
                    dateOfBirth: this.formatDate(accountDetails.dateOfBirth),
                },
                document: {
                    number: 'B01234567',
                    type: 'ID_CARD',
                    country: 'EE'
                },
                additionalData: {
                    citizenship: 'EE',
                    placeOfResidence: 'Tallinn'
                },
                lang: 'en',
                features: ['selfid'],
                timestamp: this.timestamp()
            }
        }
    }

    formatDate(dob: string) {
        const date = new Date(Date.parse(dob));
        this.logger.log(`date is: ${JSON.stringify(date)}`);
        const year = date.getFullYear().toString();
        const mh = (date.getMonth() + 1);
        const dt = date.getDate();

        const day = this.zeroPan(dt);
        const month = this.zeroPan(mh);
        const result = year + '-' + month + '-' + dt;

        this.logger.log(`${result}`);
        return result;
    }

    zeroPan(value: number): string {
        if (value < 10) {
            return '0' + value.toString();
        }
        return value.toString();
    }

    timestamp() { return new Date().toISOString() };
}