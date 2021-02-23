import { AccountDetails } from "./account-details";

export enum SessionStatus {
    PENDING,
    APPROVED,
    DECLINED,
    RESUBMISSION,
    EXPIRED,
    ABANDONED
}

export interface Session {
    id: string;
    status: SessionStatus;
    account: AccountDetails
}