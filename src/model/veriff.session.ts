import { PersonData } from "./veriff.decision";

export interface SessionCreateRequest {
    verification: Verification
}

export interface Verification {
    person: Person;
    document: Document;
    additionalData?: AdditionalData;
    features?: string[];
    vendorData?: string;
    lang?: string;
    timestamp?: string;
}

export interface Person {
    firstName?: string;
    lastName?: string;
    idNumber?: string;
    dateOfBirth?: string;
}

export interface Document {
    number?: string;
    type?: string;
    country?: string;
}

export interface AdditionalData {

}
/*

{
    "verification": {
        "callback": "https://veriff.com",
        "person": {
            "firstName": "John",
            "lastName": "Smith",
            "idNumber": "123456789"
        },
        "document": {
            "number": "B01234567",
            "type": "PASSPORT",
            "country": "EE"
        },
        "vendorData": "11111111",
        "lang": "en",
        "timestamp": "2016-05-19T08:30:25.597Z"
    }
}*/