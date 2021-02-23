import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsArray, IsCurrency, IsNotEmpty, IsNumber, Length } from "class-validator";

export class TransactionDetails {
    @ApiProperty({ description: "Transaction unique id", required: true, minLength: 3, maxLength: 50, example: "f987y324r7y348fhwef"}) 
    @IsAlphanumeric()
    @IsNotEmpty()
    @Length(3, 50)
    id: string;

    @ApiProperty({ description: "Transaction amount", required: true, example: "50"}) 
    @IsNumber()
    amount: number;

    @ApiProperty({ description: "Transaction currency", required: true, example: "CHF"})
    @Length(2,4)
    currency: Currency;
}

export interface Transaction extends TransactionDetails {
    username: string;
}

export enum Currency {
    EURO = 'EUR',
    USDOLLAR = 'USD',
    SWISSFRANK = 'CHF'
}