import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SafeAccountDetails } from "src/model/account-details";
import { Transaction, TransactionDetails } from "src/model/transaction";
import { TransactionRepository } from "src/repository/transaction.repository";

@ApiTags('balance')
@ApiBearerAuth()
@Controller('api/balance')
@UseGuards(JwtAuthGuard)
export class TransactionController {
    constructor(
        private transactionRepository: TransactionRepository
    ) {}
    
    @Post()
    public async createTransaction(@Body() transaction: TransactionDetails, @Req() req) {
        return await this.transactionRepository.addTransaction({
            username: req.user.username, 
            ...transaction
        })
    }

    @Get()
    public async getTransactions(@Req() req): Promise<Transaction[]> {
        return await this.transactionRepository.getTransactions(req.user.username);
    }


}