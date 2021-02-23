import { v4 as uuidv4 } from 'uuid';
import level from 'level-ts';
import { Injectable } from "@nestjs/common";
import { ConfigProvider } from "src/config/config.provider";
import { Transaction } from 'src/model/transaction';

@Injectable()
export class TransactionRepository {
    private db: level<Transaction>;
    constructor(private config: ConfigProvider) {
        this.db = new level<Transaction>(config.getDbFolder() + '/transactions');
    }

    public async getTransactions(username: string): Promise<Transaction[]> {
        return await this.db.filter((t, i, all) => t.username === username);
    }

    public async addTransaction(transaction: Transaction): Promise<Transaction> {
        return await this.db.put(uuidv4(), transaction);
    }
}