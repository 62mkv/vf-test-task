import { Injectable } from '@nestjs/common';
import * as crypto from "crypto";
import { ConfigProvider } from "../config/config.provider";

@Injectable()
export class SignatureService {
    private secret: string;
    constructor(private config: ConfigProvider) { 
        this.secret = this.config.getApiPrivateKey();
    }

    public calculateSignature(payload: object): string {
        return this.generateSignature(payload, this.secret);
    }

    public checkSignature(payload: string, signature: string): boolean {
        return this.isSignatureValid({
            signature: signature, 
            payload: payload,
            secret: this.secret
        })
    }

    isSignatureValid(data): boolean {
        const { signature, secret } = data;
        let { payload } = data;

        if (data.payload.constructor === Object) {
            payload = JSON.stringify(data.payload);
        }
        if (payload.constructor !== Buffer) {
            payload = Buffer.from(payload, 'utf8');
        }
        const hash = crypto.createHash('sha256');
        hash.update(payload);
        hash.update(Buffer.from(secret));
        const digest = hash.digest('hex');
        return digest === signature.toLowerCase();
    }

    generateSignature(payload, secret): string {
        if (payload.constructor === Object) {
            payload = JSON.stringify(payload);
        }

        if (payload.constructor !== Buffer) {
            payload = Buffer.from(payload, 'utf8');
        }

        const signature = crypto.createHash('sha256');
        signature.update(payload);
        signature.update(Buffer.from(secret, 'utf8'));
        return signature.digest('hex');
    }
}
