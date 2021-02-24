import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsAlphanumeric, IsEmail, IsNotEmpty, Length, Min } from "class-validator";
import { IsOlderThan } from "src/validation/date.validation";

export type SignupResult = Success | Failure;

export class SignupUserDetails {
    @ApiProperty({ description: "Account name", required: true, minLength: 3, maxLength: 50, example: "satanBlockchain2007"}) 
    @IsAlphanumeric()
    @IsNotEmpty()
    @Length(3, 50)
    username: string;

    @ApiProperty({ description: "First name", required: true, example: "Elon"}) 
    @IsAlpha()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ description: "Last name", required: true, example: "Musk"}) 
    @IsAlpha()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ description: "Date of birth", required: true, format: "date", example: "2007-02-24"})
    @IsNotEmpty()
    @IsOlderThan(18, {
        message: "Must be older than 18 years"
    })
    dateOfBirth: string;
    
    @ApiProperty({ description: "Email address", required: false, format: "email", example: "elon777@gmail.tg"}) 
    @IsEmail()
    email: string;

    @ApiProperty({ description: "Password", required: true, minLength: 8, format: "password"}) 
    @IsAlphanumeric()
    @IsNotEmpty()
    @Length(8)
    password: string;


    @ApiProperty({ description: "Document ID", required: true, minLength: 4, maxLength: 20, example: "BC00437878"}) 
    @IsAlphanumeric()
    @IsNotEmpty()
    @Length(4,20)
    documentNumber: string;


    @ApiProperty({
        description: "Document image attachment (size 5Mb or less)",
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
    sessionId: string
}

export interface Failure {
    kind: "failure";
    reason: string;
    details?: Object
}

export type CheckSessionResult = Success | Failure;