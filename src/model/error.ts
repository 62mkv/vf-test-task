import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlreadyExistsError extends HttpException {
    constructor(username: string) {
        super(`User ${username} already exists`, HttpStatus.BAD_REQUEST);
    }
}

export class FileException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}