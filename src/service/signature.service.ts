import * as crypto from "crypto";
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SignatureService {
    constructor(private configService: ConfigService) {}
    
    public calculateSignature(req: any): string {
        const secret = this.configService.get('X_PRIVATE_KEY');
        const payload = req.rawBody;
        const signature = crypto.createHash('sha256');
        signature.update(Buffer.from(payload, 'utf8'));
        signature.update(Buffer.from(secret, 'utf8'));
        return signature.digest('hex');
    }
}
