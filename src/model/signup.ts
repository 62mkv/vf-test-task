import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsAlphanumeric, IsEmail, IsNotEmpty, IsNotEmptyObject, Length, max } from "class-validator";

export type SignupResult = Success | Failure;

export class SignupUserDetails {
    @ApiProperty({ description: "Account name", required: true, minLength: 3, maxLength: 50, example: "satanBlockhain2007"}) 
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
    dateOfBirth: string;
    
    @ApiProperty({ description: "Email address", required: false, format: "email", example: "elon777@gmail.tg"}) 
    @IsEmail()
    email: string;

    @ApiProperty({ description: "Password", required: true, minLength: 8, format: "password"}) 
    @IsAlphanumeric()
    @IsNotEmpty()
    @Length(8)
    password: string;

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
    id: number
}

export interface Failure {
    kind: "failure";
    reason: string;
    details?: Object
}
