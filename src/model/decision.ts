export interface DecisionPayload {
    status: string;
    verification: VerificationPayload;
    // other fields omitted as we're not likely to need them for this assignment
}

export interface VerificationPayload {
    id: string;
    code: number;
    person: PersonData;
    reason?: any,
    status: string,
    // other fields omitted as we're not likely to need them for this assignment
}

export interface PersonData {
    gender?: string;
    idNumber?: string;
    lastName?: string;
    firstName?: string;
    citizenship?: string;
    dateOfBirth?: string;
    nationality?: string;
    yearOfBirth?: string;
    // other fields omitted as we're not likely to need them for this assignment
}

/**
 {
  "status": "success",
  "verification": {
    "id": "12df6045-3846-3e45-946a-14fa6136d78b",
    "code": 9001,
    "reason": null,
    "status": "approved",
    "comments": [],
    "document": {
      "type": "DRIVERS_LICENSE",
      "number": "MORGA753116SM9IJ",
      "country": "GB",
      "validFrom": null,
      "validUntil": "2022-04-20"
    },
    "reasonCode": null,
    "vendorData": "12345678",
    "decisionTime": "2019-11-06T07:18:36.916Z",
    "acceptanceTime": "2019-11-06T07:15:27.000Z",
    "additionalVerifiedData": {
      "driversLicenseCategory": {
        "B": true
      }
    },
    "riskLabels": [
    {
      "label": "document_crosslinked_with_fraud",
      "category": "document"
    },
    {
      "label": "document_integration_level_crosslinked_with_multiple_declines",
      "category": "document"
    }]
  },
  "technicalData": {
    "ip": "186.153.67.122"
  }  
}
 */