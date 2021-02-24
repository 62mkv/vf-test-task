import { AccountDetails } from "./account-details";

export enum SessionStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    DECLINED = 'DECLINED',
    RESUBMISSION = 'RESUBMISSION',
    EXPIRED = 'EXPIRED',
    ABANDONED = 'ABANDONED',
}

export interface Session {
    id: string;
    status: SessionStatus;
    account: AccountDetails;
}