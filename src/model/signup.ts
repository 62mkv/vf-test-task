import { ApiOperation, ApiProperty } from "@nestjs/swagger";

export type SignupResult = Status;

export class SignupUserDetails {
    @ApiProperty({ description: "Account name", required: true, minLength: 3, maxLength: 50}) 
    username: string;
    @ApiProperty({ description: "First name", required: true}) 
    firstName: string;
    @ApiProperty({ description: "Last name", required: true}) 
    lastName: string;
    @ApiProperty({ description: "Date of birth", required: true, format: "date"}) 
    dateOfBirth: string;
    @ApiProperty({ description: "Password", required: true, format: "password"}) 
    password: string;
    @ApiProperty({
        description: "Document image attachment",
        type: 'file',
        properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
          }
    })
    documentImage: any
}

export interface Success {
    kind: "success";
    id: number
}

export interface Failure {
    kind: "failure";
    reason: string;
    details?: Object
}

export type Status = Success | Failure;