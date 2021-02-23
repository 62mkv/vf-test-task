export interface SafeAccountDetails {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
}

export interface AccountDetails extends SafeAccountDetails {
    password: string;
}